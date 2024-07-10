import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  is_active: boolean;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}
