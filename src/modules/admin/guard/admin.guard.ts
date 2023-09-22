import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from '../services/admin.service';
import { IAdminTokenPayload } from '../types/admin-token-payload.interface';
import { ADMIN_ACCESS_TOKEN_STRATEGY } from './access-token.strategy';


@Injectable()
export class AdminGuard extends AuthGuard(ADMIN_ACCESS_TOKEN_STRATEGY) {
    constructor(
        public readonly adminService: AdminService,
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const hasValidToken = await super.canActivate(context);
        if (!hasValidToken) return false;
        const req = context.switchToHttp().getRequest();
        const token: IAdminTokenPayload = req.user;
        const admin = await this.adminService.validateAdmin(token._id);
        if (!admin) return false
        req.admin = admin
        return true;
    }
}