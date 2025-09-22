import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
} from 'typeorm'

import { PgInterval } from '@/src/contexts/shared/utils/utils'

@Entity('songs')
export class Songs {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 255, name: 'name' })
  name: number

  @Column({ type: 'varchar', length: 255, name: 'artist_name' })
  artistName: number

  @Column({ type: 'interval', nullable: false })
  duration: PgInterval

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date | null
}
