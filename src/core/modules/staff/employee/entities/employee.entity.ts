import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from '../../../../../shared/modules/address/entities/address.entity';
import { IsRut } from '../../../../../shared/validators/rut/rut.validator';
import { EmployeeDetail } from './employee-detail.entity';
import { Account } from '../../../auth/account/entity/account.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @IsRut()
  @Column({ unique: true })
  run: string;

  @Column()
  phone: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Employee, (employee) => employee.id, { nullable: true })
  manager: Employee;

  @OneToMany(() => EmployeeDetail, (employeeDetail) => employeeDetail.employee, { cascade: true })
  employeeDetails: EmployeeDetail[];

  @OneToOne(() => Account, (account) => account.employee, { cascade: true })
  @JoinColumn()
  account: Account;

  @OneToMany(() => Address, (address) => address.employee, { cascade: true })
  addresses: Address[];

  @Column({ default: false })
  is_deleted: boolean;
}
