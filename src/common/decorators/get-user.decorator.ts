import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserTokenPayload } from 'src/modules/auth/types/user-token-payload.interface';
import { User } from 'src/modules/user/schema/user.schema';

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext): IUserTokenPayload | User => {
  return ctx.switchToHttp().getRequest().user;
});