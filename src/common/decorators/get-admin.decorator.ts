import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Admin } from 'src/modules/admin/admin.schema';
import { IAdminTokenPayload } from 'src/modules/admin/types/admin-token-payload.interface';

export const GetAdmin = createParamDecorator((_data, ctx: ExecutionContext): IAdminTokenPayload | Admin => {
  return ctx.switchToHttp().getRequest().admin;
});