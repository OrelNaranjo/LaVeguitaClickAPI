import { IsNotEmpty } from 'class-validator';
import { Privilege } from '../../privilege/entities/privilege.entity';

export class CreateRoleDto {
  @IsNotEmpty()
  name: string;

  description: string;

  privileges: Privilege[];
}
