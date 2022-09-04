// import { User } from '../user/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity()
export class GiftCodes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @Column()
  isValid: boolean;

  // @ManyToOne((_type) => User, (user) => user.codes)
  // user: User;
}
