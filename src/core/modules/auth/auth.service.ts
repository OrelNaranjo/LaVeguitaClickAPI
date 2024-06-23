import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginCredentialsDto } from './login-credentials.dto';
import { LoginResponseDto } from './login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(credentials: LoginCredentialsDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(credentials.username, credentials.password);
    if (!user) {
      throw new UnauthorizedException('Las credenciales proporcionadas son incorrectas');
    }
    const payload = { name: user.name, lastname: user.lastname, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
