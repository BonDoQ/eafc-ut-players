import { Injectable, Logger } from '@nestjs/common';
import { webkit } from 'playwright';
import prettyHrtime from 'pretty-hrtime';
import { KeeperHTMLScrapper, PlayerHTMLScrapper } from './helpers/player-html-mapper';
import { scrapSleep } from './helpers/utils';
import { DirectusService } from './directus.service';
import { DPlayer } from './helpers/directus.schema';

@Injectable()
export class PlayerHTMLScrapperService {
  private readonly logger = new Logger(PlayerHTMLScrapperService.name);

  constructor(private readonly directusService: DirectusService) {}

  public async scrapPlayerHTML(playerId: number) {
    const futbinUrl = `https://www.futbin.com/24/player/${playerId}`;
    const browser = await webkit.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      await page.goto(futbinUrl);

      const player: Partial<DPlayer> = {};

      this.logger.log(`Scraping player ${playerId}, title: ${await page.title()}`);

      for await (const [property, selector] of Object.entries(PlayerHTMLScrapper)) {
        player[property] = await selector(page);
      }

      if (player['position'] === 'GK') {
        for await (const [property, selector] of Object.entries(KeeperHTMLScrapper)) {
          player[property] = await selector(page);
        }
      }

      return await this.directusService.enrichPlayer(playerId, { id: playerId, ...player });
    } catch (error) {
      this.logger.error(`Error enriching player ${playerId}`, error);
    } finally {
      await browser.close();
    }
  }

  public async scrapBatchPlayersHTML(players) {
    for await (const player of players) {
      try {
        await this.scrapPlayerHTML(player.id);
        await scrapSleep(50, 150);
      } catch (error) {
        this.directusService.enrichPlayer(player.id, { date_updated: '$NOW' as any });
        this.logger.error(`Error enriching player ${player.id}`, error);
      }
    }
  }

  public async scrapBatchPlayersHTMLWithSpeed(players) {
    const playersAll = [];
    for await (const player of players) {
      try {
        playersAll.push(this.scrapPlayerHTML(player.id));
        await scrapSleep(1000, 2500);
      } catch (error) {
        this.directusService.enrichPlayer(player.id, { date_updated: '$NOW' as any });
        this.logger.error(`Error enriching player ${player.id}`, error);
      }
    }

    await Promise.all(playersAll);
  }

  public async scrapAllPlayersHTML() {
    const limit = 10;
    this.logger.log(`Enriching all players via HTML Scrapping with chunks of ${limit}`);

    const count = await this.directusService.countNonEnrichedPlayers();
    this.logger.log(`Total non enriched players: ${count}`);

    for (let i = 0; i < count; i += limit) {
      const start = process.hrtime();
      const players = await this.directusService.findNonEnrichedPlayers(limit);
      await this.scrapBatchPlayersHTML(players);
      const end = process.hrtime(start);
      const elapsed = prettyHrtime(end);

      this.logger.log(
        `Enriched ${players.length} players in ${elapsed}. (offset: ${i + limit}, total: ${count}, left: ${count - i - limit})`,
      );
    }
  }
}
