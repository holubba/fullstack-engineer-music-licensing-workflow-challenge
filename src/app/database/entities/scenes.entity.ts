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

import { Movies } from './movies.entity'

@Entity('scenes')
export class Scenes {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'int', unsigned: true, name: 'movie_id' })
  movieId: number

  @Column({ type: 'varchar', length: 255, name: 'start_time' })
  startTime: string

  // TODO: define time format
  @Column({ type: 'varchar', length: 255, name: 'end_time' })
  endTime: string

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date | null

  @ManyToOne(() => Movies)
  @JoinColumn({ name: 'movie_id' })
  movie: Movies
}
