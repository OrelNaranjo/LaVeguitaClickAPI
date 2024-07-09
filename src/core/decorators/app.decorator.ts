import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

export const GetPrivileges = (...privileges: string[]) => SetMetadata('privileges', privileges);
export const GetUsername = createParamDecorator((_data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user.username;
});
