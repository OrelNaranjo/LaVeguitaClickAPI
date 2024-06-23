import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';

@Entity()
@Index(['warehouse', 'product'], { unique: true })
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ default: 0 })
  min_stock: number;

  @Column({ default: 0 })
  max_stock: number;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.stocks)
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;

  @ManyToOne(() => Product, (product) => product.stocks)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
