import fetch from 'node-fetch';
import { Injectable, Logger } from '@nestjs/common';
import { NationsService } from 'src/nations/nations.service';
import { ClubsService } from 'src/clubs/clubs.service';
import { LeaguesService } from 'src/leagues/leagues.service';
import { CreateLeagueFromFutbinDto } from '@src/leagues/entities/create-league-from-futbin.dto';

interface IData {
  [key: string]: CreateLeagueFromFutbinDto;
}

@Injectable()
export class NLCScrapperService {
  private readonly logger = new Logger(NLCScrapperService.name);

  constructor(
    private readonly nationService: NationsService,
    private readonly leagueService: LeaguesService,
    private readonly clubService: ClubsService,
  ) {}

  public async scrapAndUpdateAllNations() {
    try {
      this.logger.log('Scraping all nations from futbin...');
      const { data } = await fetch('https://www.futbin.org/futbin/api/getAllNations').then((res) => res.json());

      await this.nationService.createFromFutbin(data);
      this.logger.log('All Nations updated!');
    } catch (err) {
      this.logger.error(err);
    }
  }

  public async scrapAndUpdateAllLeaguesAndClubs() {
    try {
      this.logger.log('Scraping all leagues and clubs from futbin...');
      const { data }: { data: IData } = await fetch('https://www.futbin.org/futbin/api/getLeaguesAndClubs').then(
        (res) => res.json(),
      );

      for await (const league of Object.values(data)) {
        const clubs = this.clubService.create({ clubs: league.clubs });
        await this.leagueService.create(league, clubs);
      }

      this.logger.log('All Leagues and Clubs updated!');
    } catch (err) {
      this.logger.error(err);
    }
  }
}
