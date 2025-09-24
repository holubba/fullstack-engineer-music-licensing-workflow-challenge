import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Column,
  Entity,
} from 'typeorm'

import { Movies } from '../../movies/domain/movies.entity'
import { Tracks } from '../../tracks/domain/tracks.entity'


@Entity('scenes')
export class Scenes {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'int', unsigned: true, name: 'movie_id' })
  movieId: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date | null

  @ManyToOne(() => Movies)
  @JoinColumn({ name: 'movie_id' })
  movie: Movies

  @OneToMany(() => Tracks, track => track.scene)
  tracks: Tracks[]
}
