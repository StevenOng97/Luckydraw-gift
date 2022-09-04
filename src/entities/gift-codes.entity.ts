// import { User } from '../user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class GiftCodes extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @Column({ default: true })
  isValid: boolean;

  @Column({ nullable: true })
  redeemBy: string;

  @Column({ nullable: true })
  redeemAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @ManyToOne((_type) => User, (user) => user.codes)
  // user: User;
}
