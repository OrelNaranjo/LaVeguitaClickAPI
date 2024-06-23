import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { City } from '../../city/entities/city.entity';
import { Country } from '../../country/entities/country.entity';

@Entity()
export class Region {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Country, (country) => country.regions)
  country: Country;

  @OneToMany(() => City, (city) => city.region)
  cities: City[];
}
