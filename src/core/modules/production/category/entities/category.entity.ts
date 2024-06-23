import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Image } from '../../../../../shared/modules/image/entities/image.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  is_active: boolean;

  @OneToOne(() => Image, (image) => image.category, { cascade: true })
  image: Image;

  @ManyToOne(() => Category, (category) => category.childrens)
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent, { cascade: true })
  childrens: Category[];

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
