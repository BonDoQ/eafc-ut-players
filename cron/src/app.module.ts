import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommanderModule } from './commander/commander.module';
import { FutbinScrapperModule } from './futbin-scrapper/futbin-scrapper.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FutbinScrapperModule,
    CommanderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
