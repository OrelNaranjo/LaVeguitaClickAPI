import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Commune } from '../../commune/entities/commune.entity';
import { Region } from '../../region/entities/region.entity';

@Entity()
export class City {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  region_id: number;

  @ManyToOne(() => Region, (region) => region.cities)
  @JoinColumn({ name: 'region_id' })
  region: Region;

  @OneToMany(() => Commune, (commune) => commune.city)
  communes: Commune[];
}
