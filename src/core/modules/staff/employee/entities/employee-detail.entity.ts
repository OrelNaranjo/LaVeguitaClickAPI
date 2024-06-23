import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from './employee.entity';
import { ContractType } from '../../../../../shared/enumerators/contract-type.enum';

@Entity()
export class EmployeeDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: string;

  @Column()
  department: string;

  @Column()
  salary: number;

  @Column()
  hire_date: Date;

  @Column({ default: null, nullable: true })
  fire_date: Date;

  @Column({ type: 'enum', enum: ContractType, default: ContractType.INDEFINITE })
  contract_type: ContractType;

  @Column()
  contract_number: number;

  @ManyToOne(() => Employee, (employee) => employee.employeeDetails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @Column({ default: false })
  is_deleted: boolean;
}
