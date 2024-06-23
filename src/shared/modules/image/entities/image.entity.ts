import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Category } from '../../../../core/modules/production/category/entities/category.entity';
import { Product } from '../../../../core/modules/production/product/entities/product.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  alt: string;

  @Column()
  url: string;

  @ManyToOne(() => Product, (product) => product.images, { nullable: true })
  @JoinColumn()
  product: Product;

  @OneToOne(() => Category, (category) => category.image, { nullable: true })
  @JoinColumn()
  category: Category;
}
