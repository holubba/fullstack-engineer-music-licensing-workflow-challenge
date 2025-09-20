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

import { LicenseStatus } from './types/types'
import { Tracks } from './tracks.entity'

@Entity('licenses')
export class Licenses {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number

  @Column({ type: 'int', unsigned: true, name: 'track_id' })
  trackId: number

  @Column({
    type: 'enum',
    enum: LicenseStatus,
  })
  status: LicenseStatus

  @Column({ type: 'varchar', length: 255, name: 'rights_holder' })
  rightsHolder: string

  @Column({ type: 'text', name: 'notes' })
  notes?: string | null

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date | null

  @ManyToOne(() => Tracks)
  @JoinColumn({ name: 'track_id' })
  track: Tracks
}
