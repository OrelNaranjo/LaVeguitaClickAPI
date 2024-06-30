import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { City } from '../../city/entities/city.entity';
import { Country } from '../../country/entities/country.entity';

@Entity()
export class Region {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country_id: number;

  @ManyToOne(() => Country, (country) => country.regions)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @OneToMany(() => City, (city) => city.region)
  cities: City[];
}
