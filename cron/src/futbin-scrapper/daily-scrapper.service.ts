import { Injectable, Logger } from '@nestjs/common';
import { IPlayerCallback, multiValueHtmlScrapper } from './helpers/utils';
import { DirectusService } from './directus.service';
import pMap from 'p-map';

@Injectable()
export class DailyScrapperService {
  private readonly logger = new Logger(DailyScrapperService.name);

  constructor(private readonly directusService: DirectusService) {}

  private async scrapNewPlayerIds(lastRun: Date) {
    let page = 1;

    while (true) {
      this.logger.log(`Scraping page: ${page} for new players`);

      const futbinUrl = `https://www.futbin.com/latest?page=${page}`;
      const selector = 'tr.player-row';

      const callback: IPlayerCallback = (els) =>
        els.map((el) => {
          const playerId = el.querySelector('.table-player-info a')?.getAttribute('href').split('/')[3];
          const playerPath = el.querySelector('.table-player-info a')?.getAttribute('href');
          const addedDate = el.querySelector('td:last-child')?.textContent;
          return { playerId, playerPath, addedDate };
        });

      const newPlayers: { playerId: string; playerPath: string; addedDate: string }[] = await multiValueHtmlScrapper(
        futbinUrl,
        selector,
        callback,
      );

      const filteredNewPlayers = newPlayers
        .filter((player) => player.addedDate && new Date(player.addedDate) >= lastRun)
        .map((player) => ({
          id: +player.playerId,
          path: player.playerPath,
        }));

      await this.directusService.addPlayers(filteredNewPlayers);
      this.logger.log(
        `Added ${filteredNewPlayers.length} new players from page: ${page} with total Players of ${newPlayers.length} players.`,
      );

      if (filteredNewPlayers.length === 0 || filteredNewPlayers.length < newPlayers.length) break;

      page++;
    }

    return page;
  }

  public async getNewPlayerIds() {
    // get latest daily or full run from SrapStats
    const dailyScrapLastRun = await this.directusService.getLastScrapStats('daily');
    const fullScrapLastRun = await this.directusService.getLastScrapStats('full');

    const lastRun = dailyScrapLastRun?.date_created || fullScrapLastRun?.date_created;
    this.logger.log(`Last run: ${lastRun}`);
    if (!lastRun) {
      this.logger.error('No last run found');
      return;
    }

    this.logger.log(`Scraping new players since: ${lastRun}`);
    const page = await this.scrapNewPlayerIds(new Date(lastRun));
    await this.directusService.updateScrapStats({ type: 'daily', current_page: page, total_pages: page });
    this.logger.log(`Scraping new players finished at page: ${page}`);
    return;
  }

  public async scrapNewCardVersions() {
    this.logger.log('Scraping all card versions from futbin...');
    const { data } = await fetch('https://www.futbin.org/futbin/api/24/getItemRarities').then((res) => res.json());

    if (!data) {
      this.logger.error('No Card Versions found');
      return;
    }

    const currentCardVersions = await this.directusService.getAllCardVersions();

    const diff = data
      .map((cardVersion) => ({
        id: cardVersion.ID,
        full_name: cardVersion.full_name,
        name: cardVersion.name,
        slug: cardVersion.get,
        img: cardVersion.urls.large,
      }))
      .filter((cardVersion) => !currentCardVersions.find((current) => current.id === cardVersion.id));

    const updater = async (cardVersion) => await this.directusService.upsertCardVersion(cardVersion);
    await pMap(diff, updater, { concurrency: 5 });

    this.logger.log(`${diff.length} Cards Versions updated!`);
  }
}
