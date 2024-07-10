import { Role } from '../../role/entities/role.entity';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  is_active: boolean;

  roles: Role[];
}
