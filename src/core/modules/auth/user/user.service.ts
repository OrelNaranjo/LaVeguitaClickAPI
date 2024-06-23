import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Account } from '../account/entity/account.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async create(user: CreateUserDto): Promise<Partial<User>> {
    const newUser = new User();
    newUser.username = user.username;
    newUser.name = user.name;
    newUser.lastname = user.lastname;
    newUser.email = user.email;
    newUser.password = bcrypt.hashSync(user.password, 10);

    if (user.role) {
      const role = await this.roleRepository.findOneBy({ id: user.role });
      newUser.role = role;
    }
    const savedUser = await this.userRepository.save(newUser);

    const result = { ...savedUser };
    delete result.password;

    return result;
  }

  async findAll() {
    return this.userRepository.find({ select: ['id', 'name', 'lastname', 'username', 'email', 'role'], relations: ['role'] });
  }

  async findOneByUsernameOrEmail(usernameOrEmail: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: [
        { username: usernameOrEmail },
        { email: usernameOrEmail }
      ],
      relations: ['role', 'account', 'role.privileges'],
    });

    if (!user) {
      throw new UnauthorizedException('Las credenciales proporcionadas son incorrectas');
    }

    const account = await this.accountRepository.findOne({
      where: { id: user.account.id },
    });

    if (!account.is_active) {
      throw new ForbiddenException('La cuenta se encuentra deshabilitada');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (updateUserDto.role !== undefined) {
      user.role = await this.roleRepository.findOneBy({ id: updateUserDto.role });
    }
    await this.userRepository.save(user);

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    await this.userRepository.remove(user);

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }
}
