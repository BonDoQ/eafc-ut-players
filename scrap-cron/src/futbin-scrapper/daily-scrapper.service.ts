import { Injectable, Logger } from '@nestjs/common';
import { IPlayerCallback, multiValueHtmlScrapper } from './helpers/utils';
import { DirectusService } from './directus.service';

@Injectable()
export class DailyScrapperService {
  private readonly logger = new Logger(DailyScrapperService.name);

  constructor(private readonly directusService: DirectusService) {}

  private async scrapNewPlayerIds(lastRun: Date) {
    let page = 1;

    while (true) {
      this.logger.log(`Scraping page: ${page} for new players`);

      const futbinUrl = `https://www.futbin.com/latest?page=${page}`;
      const selector = '.table-new-players tbody tr';

      const callback: IPlayerCallback = (els) =>
        els.map((el) => {
          const playerId = el.querySelector('.get-tp')?.getAttribute('data-site-id');
          const addedDate = el.querySelector('td:last-child')?.textContent;
          return { playerId, addedDate };
        });

      const newPlayers: { playerId: string; addedDate: string }[] = await multiValueHtmlScrapper(
        futbinUrl,
        selector,
        callback,
      );

      const filteredNewPlayers = newPlayers
        .filter((player) => player.addedDate && new Date(player.addedDate) >= lastRun)
        .map((player) => player.playerId);

      await this.directusService.addPlayerIds(filteredNewPlayers);
      this.logger.log(
        `Added ${filteredNewPlayers.length} new players from page: ${page} with total Players of ${newPlayers.length} players.`,
      );

      if (filteredNewPlayers.length === 0 || filteredNewPlayers.length < newPlayers.length) break;

      page++;
    }

    this.logger.log(`Scraping new players finished at page: ${page}`);

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
    this.logger.log(`Scraping new players finished at page: ${page}`);
    // await this.scrapService.updateScrapStats('daily', page, page);

    return;
  }
}
