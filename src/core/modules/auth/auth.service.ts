import { AccountService } from './account/account.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginCredentialsDto } from './login-credentials.dto';
import { LoginResponseDto } from './login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async validateUser(usernameOrEmail: string, password: string): Promise<any> {
    const account = await this.accountService.findOneByUsernameOrEmail(usernameOrEmail);
    if (account && bcrypt.compareSync(password, account.password)) {
      return account;
    }
    return null;
  }

  async login(credentials: LoginCredentialsDto): Promise<LoginResponseDto> {
    const account = await this.validateUser(credentials.username, credentials.password);
    if (!account) {
      throw new UnauthorizedException('Las credenciales proporcionadas son incorrectas');
    }
    const payload = {
      first_name: account.first_name,
      last_name: account.last_name,
      email: account.email,
      roles: account.roles,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
