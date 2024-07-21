import { Injectable, Logger } from '@nestjs/common';
import { IPlayerCallback, multiValueHtmlScrapper, scrapSleep, singleValueHtmlScrapper } from './helpers/utils';
import { DirectusService } from './directus.service';

@Injectable()
export class FullScrapperService {
  private readonly logger = new Logger(FullScrapperService.name);

  constructor(private readonly directusService: DirectusService) {}

  private async getTotalPlayers() {
    const futbinUrl = 'https://www.futbin.com/players?page=1&sort=Player_Rating&order=desc';
    const selector = '.pagination li:nth-last-child(2)';
    return await singleValueHtmlScrapper(futbinUrl, selector, 'number');
  }

  private async scrapAllPlayerIds(currentIndex: number, totalPagesCount: number) {
    for (let i = currentIndex + 1; i <= totalPagesCount; i++) {
      const futbinUrl = `https://www.futbin.com/players?page=${i}&sort=Player_Rating&order=desc`;
      const selector = '.player_name_players_table';
      const callback: IPlayerCallback = (els) => els.map((el) => el.getAttribute('data-site-id'));
      const ids = await multiValueHtmlScrapper(futbinUrl, selector, callback);

      // TODO: Uncomment this line
      // await this.directusService.addPlayers(ids);
      await this.directusService.updateScrapStats({
        type: 'full',
        current_page: i,
        total_pages: totalPagesCount,
      });

      this.logger.log(`Scrapped page ${i} of ${totalPagesCount} with ${ids.length} players.`);
      scrapSleep(50, 150);
    }
  }

  public async prepareAllPlayerIds() {
    const totalPagesCount = await this.getTotalPlayers();
    const stats = await this.directusService.updateScrapStats({
      type: 'full',
      current_page: 0,
      total_pages: totalPagesCount,
    });

    this.logger.log(
      `Starting the Scrapper with current index: ${stats.current_page}, Total pages count: ${stats.total_pages}`,
    );
    await this.scrapAllPlayerIds(stats.current_page, stats.total_pages);

    this.logger.log('Player Scrapper finished!!!');
    return totalPagesCount;
  }
}
