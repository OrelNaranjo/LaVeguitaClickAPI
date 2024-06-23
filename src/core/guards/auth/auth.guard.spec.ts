import { Test } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let reflector: Reflector;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AuthGuard, { provide: Reflector, useValue: { get: jest.fn() } }, { provide: JwtService, useValue: { verify: jest.fn() } }],
    }).compile();

    authGuard = moduleRef.get<AuthGuard>(AuthGuard);
    reflector = moduleRef.get<Reflector>(Reflector);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('should throw UnauthorizedException if no authorization header', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: {} }),
      }),
    };
    expect(() => authGuard.canActivate(context as ExecutionContext)).toThrow('Token no proporcionado');
  });

  it('should throw UnauthorizedException if authorization header without token', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: 'Bearer ' } }),
      }),
    };
    expect(() => authGuard.canActivate(context as ExecutionContext)).toThrow('Token no proporcionado');
  });

  it('should throw UnauthorizedException if invalid token', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: 'Bearer invalid_token' } }),
      }),
    };
    jwtService.verify = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    expect(() => authGuard.canActivate(context as ExecutionContext)).toThrow('Token inválido');
  });

  it('should return true if no required privileges', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: 'Bearer valid_token' }, user: { privileges: [] } }),
      }),
      getHandler: () => {},
    };
    jwtService.verify = jest.fn().mockImplementation((token) => {
      if (token === 'valid_token') {
        return {};
      } else {
        throw new Error();
      }
    });
    reflector.get = jest.fn().mockReturnValue(null);
    expect(authGuard.canActivate(context as ExecutionContext)).toBe(true);
  });

  it('should return true if user has required privileges', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: 'Bearer valid_token' }, user: { privileges: [{ name: 'admin' }] } }),
      }),
      getHandler: () => {},
    };
    jwtService.verify = jest.fn().mockImplementation((token) => {
      if (token === 'valid_token') {
        return { privileges: [{ name: 'admin' }] };
      } else {
        throw new Error();
      }
    });
    reflector.get = jest.fn().mockReturnValue(['admin']);
    expect(authGuard.canActivate(context as ExecutionContext)).toBe(true);
  });

  it('should throw UnauthorizedException if user does not have required privileges', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: 'Bearer valid_token' }, user: { privileges: [{ name: 'user' }] } }),
      }),
      getHandler: () => {},
    };
    jwtService.verify = jest.fn().mockImplementation((token) => {
      if (token === 'valid_token') {
        return { privileges: [{ name: 'user' }] };
      } else {
        throw new Error();
      }
    });
    reflector.get = jest.fn().mockReturnValue(['admin']);
    expect(() => authGuard.canActivate(context as ExecutionContext)).toThrow('No tienes los permisos necesarios para realizar esta accion');
  });
});
