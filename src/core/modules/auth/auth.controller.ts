import { Controller, Post, Body } from '@nestjs/common';
import { LoginCredentialsDto } from './login-credentials.dto';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: LoginCredentialsDto): Promise<LoginResponseDto> {
    return this.authService.login(credentials);
  }
}
