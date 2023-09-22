import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { IUserTokenPayload } from '../types/user-token-payload.interface';
import { USER_ACCESS_TOKEN_STRATEGY } from './access-token.strategy';


@Injectable()
export class UserGuard extends AuthGuard(USER_ACCESS_TOKEN_STRATEGY) {
    constructor(
        public readonly authService: AuthService,
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const hasValidToken = await super.canActivate(context);
        if (!hasValidToken) return false;
        const req = context.switchToHttp().getRequest();
        const token: IUserTokenPayload = req.user;
        const user = await this.authService.validateUser(token._id);
        req.user = user
        return true;
    }
}