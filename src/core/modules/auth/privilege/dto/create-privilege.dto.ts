import { IsNotEmpty } from 'class-validator';

export class CreatePrivilegeDto {
  @IsNotEmpty()
  name: string;

  description: string;
}
