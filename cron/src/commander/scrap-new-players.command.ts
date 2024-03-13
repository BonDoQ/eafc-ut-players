import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { LoggerService } from './logger.service';
import { DailyScrapperService } from '../futbin-scrapper/daily-scrapper.service';
import { PlayerHTMLScrapperService } from '../futbin-scrapper/player-html-scrapper.service';

@Command({ name: 'scrap-new-players', description: 'A parameter parse' })
export class ScrapNewPlayersCommand extends CommandRunner {
  private logger: Logger = LoggerService.getInstance();

  constructor(
    private readonly dailyScrapperService: DailyScrapperService,
    private readonly plauerHTMLScrapperService: PlayerHTMLScrapperService,
  ) {
    super();
  }

  async run(): Promise<void> {
    this.logger.log('Running Command: ScrapNewPlayers');
    await this.dailyScrapperService.getNewPlayerIds();
    await this.plauerHTMLScrapperService.scrapAllPlayersHTML();
  }
}
// getNewPlayerIds