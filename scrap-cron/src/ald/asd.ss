import { Module } from '@nestjs/common';
import { FutbinScrapperController } from './futbin-scrapper.controller';
import { NLCScrapperService } from './nlc-scrapper.service';
import { NationsModule } from 'src/nations/nations.module';
import { LeaguesModule } from 'src/leagues/leagues.module';
import { ClubsModule } from 'src/clubs/clubs.module';
import { PlayersModule } from '@src/players/players.module';
import { FullScrapperService } from './full-scrapper.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ScrapStats } from './entites/scrapper.entity';
import { ScrapStatsService } from './scrap-stats.service';
import { DailyScrapperService } from './daily-scrapper.service';
import { PlayerHTMLScrapperService } from './player-html-scrapper.service';
import { AuthModule } from '@src/auth/auth.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([ScrapStats]),
    NationsModule,
    LeaguesModule,
    ClubsModule,
    PlayersModule,
    AuthModule,
  ],
  controllers: [FutbinScrapperController],
  providers: [
    NLCScrapperService,
    FullScrapperService,
    DailyScrapperService,
    PlayerHTMLScrapperService,
    ScrapStatsService,
  ],
})
export class FutbinScrapperModule {}
