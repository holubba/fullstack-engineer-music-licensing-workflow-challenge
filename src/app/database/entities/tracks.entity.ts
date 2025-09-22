import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Column,
  Entity,
} from 'typeorm'
import { PgInterval } from '@/src/contexts/shared/utils/utils'

import { Licenses } from './licenses.entity'
import { Scenes } from './scenes.entity'
import { Songs } from './songs.entity'

@Entity('tracks')
export class Tracks {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'int', unsigned: true, name: 'scene_id' })
  sceneId: number

  @Column({ type: 'int', unsigned: true, name: 'song_id' })
  songId: number

  @Column({ type: 'interval', name: 'start_time' })
  startTime: PgInterval

  @Column({ type: 'interval', name: 'end_time' })
  endTime: PgInterval

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date | null

  @ManyToOne(() => Scenes)
  @JoinColumn({ name: 'scene_id' })
  scene: Scenes

  @ManyToOne(() => Songs)
  @JoinColumn({ name: 'song_id' })
  song: Songs

  @OneToOne(() => Licenses, license => license.track)
  license: Licenses
}
