import { Module } from '@nestjs/common';
import { DirectusService } from './directus.service';
import { DailyScrapperService } from './daily-scrapper.service';

@Module({
  imports: [],
  controllers: [],
  providers: [DirectusService, DailyScrapperService],
})
export class FutbinScrapperModule {}
