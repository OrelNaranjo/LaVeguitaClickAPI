import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Employee } from '../../../staff/employee/entities/employee.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  is_active: boolean;

  @OneToOne(() => User, (user) => user.account)
  user: User;

  @OneToOne(() => Employee, (employee) => employee.account)
  employee: Employee;
}
