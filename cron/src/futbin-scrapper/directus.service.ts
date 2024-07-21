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
  uploadFiles,
} from '@directus/sdk';
import { DCard, DClub, DLeague, DNation, DPlayer, DSchema, DScrapStats } from './helpers/directus.schema';
import { getFile } from './helpers/utils';

type Entity = DCard | DClub | DLeague | DNation;

@Injectable()
export class DirectusService {
  private readonly logger: Logger;
  private readonly directusClient: DirectusClient<DSchema> & RestClient<DSchema> & StaticTokenClient<DSchema>;

  constructor(private readonly configservice: ConfigService) {
    this.logger = LoggerService.getInstance();
    this.directusClient = createDirectus<DSchema>(this.configservice.get('DIRECTUS_URL'))
      .with(rest())
      .with(staticToken(this.configservice.get('DIRECTUS_TOKEN')));
  }

  private async upsertItem<T extends Entity>(
    collection: keyof DSchema,
    item: Partial<T>,
    uploadFolderId: string,
    primaryKey: string = 'id',
  ) {
    try {
      const imgField = item.hasOwnProperty('img') ? 'img' : 'flag';

      const formData = await getFile(item[imgField], {
        folder: uploadFolderId,
        title: item.name,
      });

      const flagItem = await this.directusClient.request(uploadFiles(formData));

      item[imgField] = flagItem.id;

      const itemRecord = await this.directusClient.request<T[]>(
        readItems(collection, {
          filter: {
            [primaryKey]: { _eq: item[primaryKey] },
          },
        }),
      );

      if (itemRecord.length > 0) {
        return await this.directusClient.request(updateItem(collection, itemRecord[0].id, item));
      } else {
        return await this.directusClient.request(createItem(collection, item));
      }
    } catch (err) {
      this.logger.error(err);
    }
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

  public async addPlayers(players: Partial<DPlayer>[]) {
    return await this.directusClient.request<DPlayer[] | null>(createItems('players', players));
  }

  public async countNonEnrichedPlayers(key: string = 'fullname'): Promise<number> {
    const result = await this.directusClient.request(
      aggregate('players', {
        aggregate: { count: '*' },
        query: {
          filter: {
            [key]: { _null: true },
          },
          fields: ['id'],
        },
      }),
    );

    return result.length > 0 ? +result[0].count : 0;
  }

  public async findNonEnrichedPlayers(limit: number, key: string = 'fullname'): Promise<DPlayer[]> {
    return await this.directusClient.request<DPlayer[]>(
      readItems('players', {
        filter: {
          [key]: { _null: true },
        },
        fields: ['id'],
        sort: 'date_updated',
        limit,
      }),
    );
  }

  public async enrichPlayer(playerId: number, player: Partial<DPlayer>) {
    if (player.img) {
      const uploadFolderId = '45d0c96c-c19b-4c96-ae18-108977e5f661';
      const formData = await getFile(player.img, {
        folder: uploadFolderId,
        title: playerId.toString(),
      });
      const flagItem = await this.directusClient.request(uploadFiles(formData));
      player.img = flagItem.id;
    }

    if (player.card_id) {
      const cardName = player.card_id as any;
      const cardRecord = await this.directusClient.request<DCard[]>(
        readItems('cards', {
          filter: {
            name: { _eq: cardName },
          },
        }),
      );

      player.card_id = cardRecord?.[0]?.id;
    }
    return await this.directusClient.request<DPlayer>(updateItem('players', playerId, player));
  }

  public async upsertNation(nation: Partial<DNation>) {
    return this.upsertItem<DNation>('nations', nation, '824074e4-e76b-43b2-9bf2-1bca1ec8ecb9');
  }

  public async upsertClub(club: Partial<DClub>) {
    return this.upsertItem<DClub>('clubs', club, 'a31f4111-f5ce-4c3b-8ec7-63c474b00dc4');
  }

  public async upsertLeague(league: Partial<DLeague>) {
    return this.upsertItem<DLeague>('leagues', league, '2cfbf865-13ff-4ba0-9f0c-c715275e7916');
  }

  public async upsertCardVersion(card: Partial<DCard>) {
    return await this.upsertItem<DCard>('cards', card, '2746c30e-e39d-4ee9-a4e5-8f9f71c0d703');
  }

  public async upsertLeagueClubsConnection(leagueId: number, clubIds: Array<number>) {
    for await (const clubId of clubIds) {
      const found = await this.directusClient.request(
        readItems('leagues_clubs', {
          filter: { leagues_id: { _eq: leagueId }, clubs_id: { _eq: clubId } },
        }),
      );

      if (!found.length) {
        return await this.directusClient.request(
          createItem('leagues_clubs', { leagues_id: leagueId, clubs_id: clubId }),
        );
      }
    }
  }

  public async getAllCardVersions() {
    return await this.directusClient.request<DCard[]>(readItems('cards', { fields: ['id'], limit: 200 }));
  }
}
