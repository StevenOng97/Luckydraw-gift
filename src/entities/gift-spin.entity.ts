import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  JoinColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gift } from './gift.entity';

@Entity()
export class GiftSpin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Gift, (gift) => gift.giftSpin)
  @JoinColumn()
  gift: Gift;

  @Column()
  giftId: string;
  // @OneToOne((_type) => User, (user) => user.id)
  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
