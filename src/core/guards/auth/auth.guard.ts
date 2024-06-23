import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.headers.authorization) {
      const token = request.headers.authorization.split(' ')[1];
      if (token) {
        try {
          const decoded = this.jwtService.verify(token);
          request.user = decoded;
        } catch (error) {
          throw new UnauthorizedException('Token inválido');
        }
      } else {
        throw new UnauthorizedException('Token no proporcionado');
      }
    } else {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const requiredPrivileges = this.reflector.get<string[]>('privileges', context.getHandler());
    if (!requiredPrivileges) {
      return true;
    }

    const hasPrivilege = () =>
      requiredPrivileges.some((privilege) => request.user.privileges?.some((userPrivilege) => userPrivilege.name === privilege));
    if (!hasPrivilege()) {
      throw new UnauthorizedException('No tienes los permisos necesarios para realizar esta accion');
    }

    return true;
  }
}
