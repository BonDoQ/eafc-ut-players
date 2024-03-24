import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { LoggerService } from './logger.service';
import { DailyScrapperService } from '../futbin-scrapper/daily-scrapper.service';
import { PlayerHTMLScrapperService } from '../futbin-scrapper/player-html-scrapper.service';
import { MetaScrapperService } from 'src/futbin-scrapper/meta-scrapper.service';
import { FullScrapperService } from 'src/futbin-scrapper/full-scrapper.service';

@Command({ name: 'scrap-new-players', description: 'A parameter parse' })
export class ScrapNewPlayersCommand extends CommandRunner {
  private logger: Logger = LoggerService.getInstance();

  constructor(
    private readonly dailyScrapperService: DailyScrapperService,
    private readonly playerHTMLScrapperService: PlayerHTMLScrapperService,
    private readonly fullSrcapperService: FullScrapperService,
    private readonly metaScrapperService: MetaScrapperService,
  ) {
    super();
  }

  async run(): Promise<void> {
    // await this.metaScrapperService.scrapAndUpdateAllNations();
    // await this.metaScrapperService.scrapAndUpdateAllLeaguesAndClubs();
    // await this.metaScrapperService.scrapAndUpdateAllCardVersions();

    this.logger.log('Running Command: ScrapNewPlayers');
    await this.dailyScrapperService.getNewPlayerIds();
    await this.playerHTMLScrapperService.scrapAllPlayersHTML();
  }
}
