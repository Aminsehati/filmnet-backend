import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUserTokenPayload } from '../types/user-token-payload.interface';

export const USER_ACCESS_TOKEN_STRATEGY = 'USER_ACCESS_TOKEN_STRATEGY';
@Injectable()
export class UserAccessTokenStrategy extends PassportStrategy(Strategy, USER_ACCESS_TOKEN_STRATEGY) {
    constructor(configService: ConfigService) {
        super({
            secretOrKey: configService.get<string>('USER_ACCESS_TOKEN_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: IUserTokenPayload) {
        return payload;
    }
}