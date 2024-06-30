import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from '../../../../../shared/modules/address/entities/address.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rut: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  description: string;

  @Column({ default: true })
  is_active: boolean;

  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;

  @OneToMany(() => Address, (address) => address.customer, { cascade: true })
  addresses: Address[];
}
