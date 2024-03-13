import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../commander/logger.service';
import {
  DirectusClient,
  RestClient,
  StaticTokenClient,
  createDirectus,
  createItem,
  createItems,
  readItems,
  rest,
  staticToken,
  updateItem,
  aggregate,
} from '@directus/sdk';
import { DPlayer, DSchema, DScrapStats } from './helpers/directus.schema';

@Injectable()
export class DirectusService {
  private readonly logger: Logger;
  private readonly directusToken: string;
  private readonly directusUrl: string;
  private readonly directusClient: DirectusClient<DSchema> & RestClient<DSchema> & StaticTokenClient<DSchema>;

  constructor(private readonly configservice: ConfigService) {
    this.logger = LoggerService.getInstance();
    this.directusClient = createDirectus<DSchema>(this.configservice.get('DIRECTUS_URL'))
      .with(rest())
      .with(staticToken(this.configservice.get('DIRECTUS_TOKEN')));
  }

  public async getLastScrapStats(type: 'daily' | 'full'): Promise<DScrapStats | null> {
    this.logger.log('Fetching data from directus...');

    const result = await this.directusClient.request<DScrapStats[]>(
      readItems('scrap_stats', {
        filter: {
          type: { _eq: type },
        },
        fields: ['*.*'],
        sort: '-date_created',
        limit: 1,
      }),
    );
    return result.length > 0 ? result[0] : null;
  }

  public async updateScrapStats(scrapStats: Partial<DScrapStats>) {
    this.logger.log('Updating data in directus...');

    // find or create
    const todayStart = new Date(new Date().setHours(0, 0, 0, 0)).toLocaleString();
    const todayEnd = new Date(new Date().setHours(23, 59, 59, 999)).toLocaleString();

    const stats = await this.directusClient.request<DScrapStats[] | null>(
      readItems('scrap_stats', {
        filter: {
          type: { _eq: scrapStats.type },
          date_created: {
            _between: [todayStart, todayEnd],
          },
        },
        fields: ['*.*'],
        limit: 1,
      }),
    );

    if (stats.length > 0) {
      const lastStat = stats[0];
      return await this.directusClient.request<DScrapStats>(updateItem('scrap_stats', lastStat.id, scrapStats));
    } else {
      return await this.directusClient.request<DScrapStats>(createItem('scrap_stats', scrapStats));
    }
  }

  public async addPlayerIds(ids: string[]) {
    return await this.directusClient.request<DPlayer[] | null>(
      createItems(
        'players',
        ids.map((id) => ({ id: +id })),
      ),
    );
  }

  public async countNonEnrichedPlayers(): Promise<number> {
    const result = await this.directusClient.request(
      aggregate('players', {
        aggregate: { count: '*' },
        query: {
          filter: {
            fullname: { _null: true },
          },
          fields: ['id'],
        },
      }),
    );

    return result.length > 0 ? +result[0].count : 0;
  }

  public async findNonEnrichedPlayers(limit: number): Promise<DPlayer[]> {
    return await this.directusClient.request<DPlayer[]>(
      readItems('players', {
        filter: {
          fullname: { _null: true },
        },
        fields: ['id'],
        sort: 'date_created',
        limit,
      }),
    );
  }
  //start for here
  public async enrichPlayer(playerId: number, player: Partial<DPlayer>) {
    return await this.directusClient.request<DPlayer>(updateItem('players', playerId, player));
  }
}
