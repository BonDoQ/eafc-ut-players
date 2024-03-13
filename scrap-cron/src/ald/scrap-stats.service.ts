import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ScrapStats } from './entites/scrapper.entity';

@Injectable()
export class ScrapStatsService {
  constructor(private readonly em: EntityManager) {}

  public async findLatestScrapStats(type: 'full' | 'daily') {
    return this.em.createQueryBuilder(ScrapStats).where({ type }).orderBy({ updatedAt: 'DESC' }).getSingleResult();
  }

  public async findOrCreateScrapStats(type: 'full' | 'daily', totalPagesCount: number) {
    const stats = await this.em
      .createQueryBuilder(ScrapStats)
      .where({ type })
      .andWhere('created_at between ? and ?', [
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 999)),
      ])
      .getSingleResult();

    if (stats) return stats;

    const newStats = this.em.create(ScrapStats, {
      type: type,
      total_pages: totalPagesCount,
      current_page: 0,
    });

    await this.em.persistAndFlush(newStats);
    return newStats;
  }

  public async updateScrapStats(type: 'full' | 'daily', currentPageIndex: number, totalPagesCount: number) {
    const stats = await this.findOrCreateScrapStats(type, totalPagesCount);
    stats.current_page = currentPageIndex;
    stats.total_pages = totalPagesCount;
    stats.updatedAt = new Date();

    await this.em.persistAndFlush(stats);
  }
}
