import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Supplier } from '../../../../core/modules/purchases/supplier/entities/supplier.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  position: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.contacts)
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;
}
