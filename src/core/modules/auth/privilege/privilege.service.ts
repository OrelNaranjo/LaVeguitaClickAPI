import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { Privilege } from './entities/privilege.entity';

@Injectable()
export class PrivilegeService {
  constructor(
    @InjectRepository(Privilege)
    private privilegeRepository: Repository<Privilege>,
  ) {}

  async create(createPrivilegeDto: CreatePrivilegeDto) {
    const privilege = this.privilegeRepository.create(createPrivilegeDto);
    await this.privilegeRepository.save(privilege);
    return privilege;
  }

  findAll() {
    return this.privilegeRepository.find();
  }

  findOne(id: number) {
    return this.privilegeRepository.findOneBy({ id: id });
  }

  async update(id: number, updatePrivilegeDto: UpdatePrivilegeDto) {
    const privilege = await this.privilegeRepository.findOneBy({ id: id });
    await this.privilegeRepository.save({ ...privilege, ...updatePrivilegeDto });
    return privilege;
  }

  async remove(id: number) {
    const privilege = await this.privilegeRepository.findOneBy({ id: id });
    await this.privilegeRepository.remove(privilege);
    return privilege;
  }
}
