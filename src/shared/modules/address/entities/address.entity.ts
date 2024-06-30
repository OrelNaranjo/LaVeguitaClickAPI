import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../../../../core/modules/staff/employee/entities/employee.entity';
import { Commune } from '../../commune/entities/commune.entity';
import { Supplier } from '../../../../core/modules/purchases/supplier/entities/supplier.entity';
import { Customer } from '../../../../core/modules/sales/customer/entities/customer.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  zip_code: string;

  @Column({ type: 'float', default: 0 })
  latitude: number;

  @Column({ type: 'float', default: 0 })
  longitude: number;

  @ManyToOne(() => Commune)
  commune: Commune;

  @ManyToOne(() => Employee, (employee) => employee.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @ManyToOne(() => Supplier, (supplier) => supplier.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;

  @ManyToOne(() => Customer, (customer) => customer.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;
}
