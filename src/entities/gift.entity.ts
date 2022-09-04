import { GiftSpin } from './gift-spin.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { GiftCategory } from './gift-category.entity';

@Entity()
export class Gift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(_type => GiftSpin, giftSpin => giftSpin.gift)
  giftSpin: GiftSpin;

  @ManyToOne(() => GiftCategory, (giftCategory) => giftCategory.gifts)
  giftCategory: GiftCategory;
}
