import { Entity, PrimaryGeneratedColumn, OneToOne, Column } from 'typeorm';
import { Gift } from './gift.entity';

@Entity()
export class GiftSpin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne((_type) => Gift, (gift) => gift.giftSpin)
  gift: Gift;

  // @OneToOne((_type) => User, (user) => user.id)
  @Column()
  userId: string;
}
