import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Column,
  Entity,
} from 'typeorm'

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

  @Column({ type: 'varchar', length: 255, name: 'start_time' })
  startTime: string

  // TODO: define time format
  @Column({ type: 'varchar', length: 255, name: 'end_time' })
  endTime: string

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
}
