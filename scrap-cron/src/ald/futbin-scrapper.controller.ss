import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { NLCScrapperService } from './nlc-scrapper.service';
import { FullScrapperService } from './full-scrapper.service';
import { DailyScrapperService } from '../futbin-scrapper/daily-scrapper.service';
import { PlayerHTMLScrapperService } from '../futbin-scrapper/player-html-scrapper.service';
import { AdminTokenAuthGuard } from '@src/auth/token-admin.guard';

@Controller('api/scrapper')
@UseGuards(AdminTokenAuthGuard)
export class FutbinScrapperController {
  constructor(
    private readonly fullScrapperService: FullScrapperService,
    private readonly nlcScrapperService: NLCScrapperService,
    private readonly dailyScrapperService: DailyScrapperService,
    private readonly playerHTMLScrapperService: PlayerHTMLScrapperService,
  ) {}

  @Get('nations')
  public async scrapAllNations() {
    return this.nlcScrapperService.scrapAndUpdateAllNations();
  }

  @Get('clubs-and-leagues')
  public async scrapAndUpdateAllLeaguesAndClubs() {
    return this.nlcScrapperService.scrapAndUpdateAllLeaguesAndClubs();
  }

  @Get('all-players')
  public async scrapAndUpdateAllPlayers() {
    return this.fullScrapperService.prepareAllPlayerIds();
  }

  @Get('players/:playerId')
  async scrapPlayer(@Param('playerId') playerId: number) {
    return this.playerHTMLScrapperService.scrapPlayerHTML(playerId);
  }
}
