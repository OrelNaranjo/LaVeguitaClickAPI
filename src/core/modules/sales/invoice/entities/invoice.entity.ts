import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { InvoiceDetail } from './invoice-detail.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @OneToMany(() => InvoiceDetail, (invoiceDetail) => invoiceDetail.invoice)
  details: InvoiceDetail[];

  @Column()
  customer_id: number;

  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;
}
