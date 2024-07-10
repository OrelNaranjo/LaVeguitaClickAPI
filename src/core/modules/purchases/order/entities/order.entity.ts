import { Unique, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany, DeleteDateColumn } from 'typeorm';
import { Employee } from '../../../staff/employee/entities/employee.entity';
import { Supplier } from '../../supplier/entities/supplier.entity';
import { OrderDetail } from './order-detail.entity';
import { Exclude } from 'class-transformer';

@Unique(['orderNumber'])
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderNumber: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @ManyToOne(() => Supplier)
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];
}
