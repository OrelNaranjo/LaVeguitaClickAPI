import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { City } from '../../city/entities/city.entity';

@Entity()
export class Commune {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  city_id: number;

  @ManyToOne(() => City, (city) => city.communes)
  @JoinColumn({ name: 'city_id' })
  city: City;
}
