import { Injectable, Logger } from '@nestjs/common';
import { webkit } from 'playwright';
import { KeeperHTMLScrapper, PlayerHTMLScrapper } from './helpers/player-html-mapper';
import { scrapSleep } from './helpers/utils';
import { DirectusService } from './directus.service';

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

      const player = {};

      this.logger.log(`Scraping player ${playerId}, title: ${await page.title()}`);

      for await (const [property, selector] of Object.entries(PlayerHTMLScrapper)) {
        player[property] = await selector(page);
      }

      if (player['position'] === 'GK') {
        for await (const [property, selector] of Object.entries(KeeperHTMLScrapper)) {
          player[property] = await selector(page);
        }
      }

      return this.directusService.enrichPlayer(playerId, player);
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
        this.directusService.enrichPlayer(player.id, { updatedAt: new Date() });
        this.logger.error(`Error enriching player ${player.id}`, error);
      }
    }
  }

  public async scrapAllPlayersHTML() {
    const limit = 10;

    const count = await this.directusService.countNonEnrichedPlayers();

    for (let i = 0; i < count; i += limit) {
      const players = await this.directusService.findNonEnrichedPlayers(limit);
      this.logger.log(`Enriching ${players.length} players, currentIndex: ${i}, total: ${count}`);
      //   await this.scrapBatchPlayersHTML(players);
    }
  }
}
