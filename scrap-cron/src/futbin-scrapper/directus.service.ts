import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../commander/logger.service';

@Injectable()
export class DirectusService {
  private readonly directusUrl: string;
  private readonly directusToken: string;
  private readonly logger: Logger;

  constructor(private readonly configservice: ConfigService) {
    this.directusUrl = this.configservice.get('DIRECTUS_URL');
    this.directusToken = this.configservice.get('DIRECTUS_TOKEN');
    this.logger = LoggerService.getInstance();
  }

  public async getLastScrapStats(type: 'daily' | 'full') {
    this.logger.log('Fetching data from directus...');
    const filter = `filter[type][_eq]=${type}`;
    const fields = '&fields=*.*';
    const sort = '&sort=-date_created';
    const limit = '&limit=1';
    const params = filter + fields + sort + limit;
    const url = `${this.directusUrl}/items/scrap_stats?${params}`;
    this.logger.log(`Fetching data from: ${url}`);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.directusToken}`,
      },
    });
    const data = await response.json();
    return data.data.length > 0 ? data.data[0] : null;
  }

  public async addPlayerIds(ids: string[]) {
    this.logger.log(`Adding ${ids} new players to directus...`);

    const url = `${this.directusUrl}/items/players`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.directusToken}`,
      },
      body: JSON.stringify(ids.map((id) => ({ id }))),
    });
    const data = await response.json();
    return data;
  }

  public async countNonEnrichedPlayers(): Promise<number> {
    this.logger.log('Counting non enriched players...');
    const filter = 'filter[fullname][_null]=true';
    const fields = '&fields=id';
    const aggregate = '&aggregate[count]=id';
    const params = filter + fields + aggregate;
    const url = `${this.directusUrl}/items/players?${params}`;
    console.log(url);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.directusToken}`,
      },
    });
    const data = await response.json();

    return data.data[0].count.id || 0;
  }

  public async findNonEnrichedPlayers(limit: number): Promise<any[]> {
    this.logger.log('Counting non enriched players...');
    const filter = 'filter[fullname][_null]=true';
    const fields = '&fields=id';
    const sort = '&sort=date_created';
    const lim = `&limit=${limit}`;
    const params = filter + fields + sort + lim;
    const url = `${this.directusUrl}/items/players?${params}`;
    console.log(url);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.directusToken}`,
      },
    });
    const data = await response.json();
    return data.data;
  }

  //start for here
  public async enrichPlayer(playerId: number, player: any) {
    this.logger.log(`Enriching player ${playerId}...`);
    const url = `${this.directusUrl}/items/players/${playerId}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.directusToken}`,
      },
      body: JSON.stringify(player),
    });
    const data = await response.json();
    return data;
  }
}
