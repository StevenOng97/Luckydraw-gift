import { GiftSpin } from './gift-spin.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GiftCategory } from './gift-category.entity';

@Entity()
export class Gift extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => GiftSpin, (giftSpin) => giftSpin.gift)
  @JoinColumn()
  giftSpin: GiftSpin;

  @ManyToOne(() => GiftCategory, (giftCategory) => giftCategory.gifts)
  giftCategory: GiftCategory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
