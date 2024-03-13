import { Module } from '@nestjs/common';
import { ScrapNewPlayersCommand } from './scrap-new-players.command';
import { FutbinScrapperModule } from '../futbin-scrapper/futbin-scrapper.module';
import { DirectusService } from '../futbin-scrapper/directus.service';
import { DailyScrapperService } from '../futbin-scrapper/daily-scrapper.service';
import { PlayerHTMLScrapperService } from '../futbin-scrapper/player-html-scrapper.service';

@Module({
  imports: [FutbinScrapperModule],
  providers: [DirectusService, DailyScrapperService, PlayerHTMLScrapperService, ScrapNewPlayersCommand],
})
export class CommanderModule {}
