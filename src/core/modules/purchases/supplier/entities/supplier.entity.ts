import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from '../../../../../shared/modules/address/entities/address.entity';
import { IsRut } from '../../../../../shared/validators/rut/rut.validator';
import { Contact } from '../../../../../shared/modules/contact/entity/contact.entity';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @IsRut()
  @Column({ unique: true })
  rut: string;

  @Column()
  company_name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  description: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @OneToMany(() => Contact, (contact) => contact.supplier, { cascade: true })
  contacts: Contact[];

  @OneToMany(() => Address, (address) => address.supplier, { cascade: true })
  addresses: Address[];
}
