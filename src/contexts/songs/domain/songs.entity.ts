import { Column, Entity } from 'typeorm'

import { BaseEntity } from '@/src/app/database/entities/base.entity'

@Entity('songs')
export class Songs extends BaseEntity {
  @Column({ type: 'varchar', length: 255, name: 'name' })
  name: string

  @Column({ type: 'varchar', length: 255, name: 'artist_name' })
  artistName: string

  @Column({
    type: 'int',
    nullable: false,
  })
  duration: number
}
