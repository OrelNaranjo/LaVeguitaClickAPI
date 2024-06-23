import { Module } from '@nestjs/common';
import { AddressModule } from './address/address.module';
import { CityModule } from './city/city.module';
import { CommuneModule } from './commune/commune.module';
import { RegionModule } from './region/region.module';
import { CountryModule } from './country/country.module';
import { ContactModule } from './contact/contact.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [AddressModule, CityModule, CommuneModule, RegionModule, CountryModule, ContactModule, ImageModule],
  controllers: [],
  providers: [],
})
export class SharedModule {}
