import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  OneToOne,
  Column,
  Entity,
} from 'typeorm'

import { LicenseHistory } from './license-history.entity'
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

  @Column({ type: 'text', name: 'notes', nullable: true })
  notes?: string | null

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date | null

  @OneToOne(() => Tracks)
  @JoinColumn({ name: 'track_id' })
  track: Tracks

  @OneToMany(() => LicenseHistory, lh => lh.license)
  licenseHistory: LicenseHistory[]
}
