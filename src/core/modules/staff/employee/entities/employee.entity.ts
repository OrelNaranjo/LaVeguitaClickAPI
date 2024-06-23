import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from '../../../../../shared/modules/address/entities/address.entity';
import { IsRut } from '../../../../../shared/validators/rut/rut.validator';
import { EmployeeDetail } from './employee-detail.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @IsRut()
  @Column({ unique: true })
  run: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

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

  @OneToMany(() => Address, (address) => address.employee, { cascade: true })
  addresses: Address[];

  @Column({ default: false })
  is_deleted: boolean;
}
