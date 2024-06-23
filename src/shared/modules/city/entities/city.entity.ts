import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Commune } from '../../commune/entities/commune.entity';
import { Region } from '../../region/entities/region.entity';

@Entity()
export class City {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Region, (region) => region.cities)
  region: Region;

  @OneToMany(() => Commune, (commune) => commune.city)
  communes: Commune[];
}
