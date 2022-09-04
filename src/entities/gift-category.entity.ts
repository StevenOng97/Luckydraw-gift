import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gift } from './gift.entity';

@Entity()
export class GiftCategory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  rate: number;

  @OneToMany(() => Gift, (gift) => gift.giftCategory)
  gifts: Gift[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
