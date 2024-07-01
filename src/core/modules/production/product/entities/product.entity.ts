import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, DeleteDateColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Stock } from '../../stock/entities/stock.entity';
import { Image } from '../../../../../shared/modules/image/entities/image.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ unique: true })
  sku: string;

  @Column()
  barcode: string;

  @Column({ default: true })
  is_active: boolean;

  @Column('decimal')
  price: number;

  @Column('decimal')
  cost: number;

  @Column('decimal')
  weight_kg: number;

  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;

  @ManyToMany(() => Category, { cascade: true })
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Image, (image) => image.product, { cascade: true })
  images: Image[];

  @OneToMany(() => Stock, (stock) => stock.product, { cascade: true })
  stocks: Stock[];
}
