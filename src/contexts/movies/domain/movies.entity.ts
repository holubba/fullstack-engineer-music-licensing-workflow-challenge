import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
  Entity,
} from 'typeorm'

import { Scenes } from '../../scenes/domain/scenes.entity'


@Entity('movies')
export class Movies {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'varchar', name: 'name', length: 255 })
  name: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date | null

  @OneToMany(() => Scenes, scene => scene.movie)
  scenes: Scenes[]
}
