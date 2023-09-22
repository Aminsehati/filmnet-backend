import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAdminTokenPayload } from '../types/admin-token-payload.interface';

export const ADMIN_ACCESS_TOKEN_STRATEGY = 'ADMIN_ACCESS_TOKEN_STRATEGY';
@Injectable()
export class AdminAccessTokenStrategy extends PassportStrategy(Strategy, ADMIN_ACCESS_TOKEN_STRATEGY) {
    constructor(configService: ConfigService) {
        super({
            secretOrKey: configService.get<string>('ADMIN_ACCESS_TOKEN_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: IAdminTokenPayload) {
        return payload;
    }
}