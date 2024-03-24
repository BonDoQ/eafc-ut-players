import { Injectable, Logger } from '@nestjs/common';
import { DirectusService } from './directus.service';

type IFutbinLeaguesResponse = Array<{
  league_name: string;
  league_id: number;
  clubs: Array<{ club_id: number; club_name: string }>;
}>;

@Injectable()
export class MetaScrapperService {
  private readonly logger = new Logger(MetaScrapperService.name);

  constructor(private readonly directusService: DirectusService) {}

  private async upsertClubs(clubs: Array<{ club_id: number; club_name: string }>) {
    const c = [];
    for await (const club of clubs) {
      const clubData = await this.directusService.upsertClub({
        id: club.club_id,
        name: club.club_name,
        flag: `https://cdn.futbin.com/content/fifa24/img/clubs/${club.club_id}.png`,
      });

      c.push(clubData);
      this.logger.log(`Club ${club.club_name} updated!`);
    }
    return c.map((club) => club.id);
  }

  public async scrapAndUpdateAllNations() {
    this.logger.log('Scraping all nations from futbin...');
    const { data } = await fetch('https://www.futbin.org/futbin/api/getAllNations').then((res) => res.json());

    if (!data) {
      this.logger.error('No Nations found');
      return;
    }

    await Promise.all(
      data
        .map((country) => ({
          id: country.country_id,
          name: country.country_name,
          flag: `https://cdn.futbin.com/content/fifa24/img/nation/${country.country_id}.png`,
        }))
        .map(async (nation) => await this.directusService.upsertNation(nation)),
    );

    this.logger.log('All Nations updated!');
  }

  public async scrapAndUpdateAllLeaguesAndClubs() {
    try {
      this.logger.log('Scraping all leagues and clubs from futbin...');
      const { data }: { data: IFutbinLeaguesResponse } = await fetch(
        'https://www.futbin.org/futbin/api/getLeaguesAndClubsAndroid',
      ).then((res) => res.json());

      for await (const league of data) {
        await this.directusService.upsertLeague({
          id: league.league_id,
          name: league.league_name,
          flag: `https://cdn.futbin.com/content/fifa24/img/league/${league.league_id}.png`,
        });
        this.logger.log(`League ${league.league_name} updated!`);
        const clubIds = await this.upsertClubs(league.clubs);
        this.logger.log(`Clubs ${clubIds.length} for ${league.league_name} updated!`);
        await this.directusService.upsertLeagueClubsConnection(league.league_id, clubIds);
        this.logger.log(`Connection for ${league.league_name} updated!`);
      }

      this.logger.log('All Leagues and Clubs updated!');
    } catch (err) {
      this.logger.error(err);
    }
  }

  public async scrapAndUpdateAllCardVersions() {
    this.logger.log('Scraping all card versions from futbin...');
    const { data } = await fetch('https://www.futbin.org/futbin/api/24/getItemRarities').then((res) => res.json());

    if (!data) {
      this.logger.error('No Card Versions found');
      return;
    }

    await Promise.all(
      data
        .map((cardVersion) => ({
          id: cardVersion.ID,
          full_name: cardVersion.full_name,
          name: cardVersion.name,
          slug: cardVersion.get,
          img: cardVersion.urls.large,
        }))
        .map(async (cardVersion) => await this.directusService.upsertCardVersion(cardVersion)),
    );

    this.logger.log('All Cards Versions updated!');
  }
}
