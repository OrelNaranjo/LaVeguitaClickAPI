import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './entities/region.entity';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  create(createRegionDto: CreateRegionDto) {
    const region = this.regionRepository.create(createRegionDto);
    return this.regionRepository.save(region);
  }

  findAll() {
    return this.regionRepository.find();
  }

  findOne(id: number) {
    return this.regionRepository.findOneBy({ id: id });
  }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    return this.regionRepository.update(id, updateRegionDto);
  }

  remove(id: number) {
    return this.regionRepository.delete(id);
  }
}
