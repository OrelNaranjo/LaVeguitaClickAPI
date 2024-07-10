import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Privilege } from '../../privilege/entities/privilege.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Privilege)
  @JoinTable()
  privileges: Privilege[];
}
