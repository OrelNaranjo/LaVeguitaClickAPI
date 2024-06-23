import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from '../../../../../shared/modules/address/entities/address.entity';
import { Stock } from '../../stock/entities/stock.entity';

@Entity()
export class Warehouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  capacity_kg: number;

  @Column('decimal', { default: 0 })
  used_capacity_kg: number;

  @Column({ nullable: true })
  phone: string;

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Stock, (stock) => stock.warehouse)
  stocks: Stock[];
}
