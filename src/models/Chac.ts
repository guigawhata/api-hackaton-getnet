import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('chacs')
class Chac {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, () => Chac)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  knowledge: number;

  @Column()
  hability: number;

  @Column()
  atitude: number;

  @Column()
  character: number;

  @Column()
  technical_competence: number;

  @Column()
  behavioral_competence: number;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Chac;
