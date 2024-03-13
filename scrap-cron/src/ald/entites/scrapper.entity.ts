import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class ScrapStats {
  @PrimaryKey()
  id: number;

  @Property()
  type: 'full' | 'daily';

  @Property()
  current_page: number;

  @Property()
  total_pages: number;

  @Property({ type: 'datetime' })
  createdAt = new Date();

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  updatedAt = new Date();
}
