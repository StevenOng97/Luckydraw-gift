import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Gift } from './gift.entity';

@Entity()
export class GiftCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  rate: number;

  @OneToMany((_type) => Gift, (gift) => gift.giftCategory)
  gifts: Gift[];
}
