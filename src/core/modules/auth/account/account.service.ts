import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entity/account.entity';
import { Role } from '../role/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async create(account: CreateAccountDto): Promise<Partial<Account>> {
    const newAccount = new Account();
    newAccount.username = account.username;
    newAccount.first_name = account.first_name;
    newAccount.last_name = account.last_name;
    newAccount.email = account.email;
    newAccount.password = bcrypt.hashSync(account.password, 10);

    if (account.roles) {
      const roles = await this.roleRepository.findBy(account.roles);
      newAccount.roles = roles;
    }
    const savedAccount = await this.accountRepository.save(newAccount);

    const result = { ...savedAccount };
    delete result.password;

    return result;
  }

  async findAll() {
    return this.accountRepository.find({ select: ['id', 'first_name', 'last_name', 'username', 'email', 'roles'], relations: ['roles'] });
  }

  async findOneByUsernameOrEmail(usernameOrEmail: string): Promise<Account | undefined> {
    const account = await this.accountRepository.findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      relations: ['roles', 'employee'],
    });

    if (!account) {
      throw new UnauthorizedException('Las credenciales proporcionadas son incorrectas');
    }

    if (!account.is_active) {
      throw new ForbiddenException('La cuenta se encuentra deshabilitada');
    }

    return account;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.accountRepository.findOneBy({ id: id });
    if (!account) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (updateAccountDto.roles) {
      const roles = await this.roleRepository.findBy(updateAccountDto.roles);
      account.roles = roles;
    }
    await this.accountRepository.save(account);

    const accountWithoutPassword = { ...account };
    delete accountWithoutPassword.password;

    return accountWithoutPassword;
  }

  async remove(id: number) {
    const account = await this.accountRepository.findOneBy({ id });
    if (!account) {
      throw new NotFoundException('Usuario no encontrado');
    }
    await this.accountRepository.remove(account);

    const accountWithoutPassword = { ...account };
    delete accountWithoutPassword.password;

    return accountWithoutPassword;
  }
}
