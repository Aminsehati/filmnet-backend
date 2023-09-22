import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto'
@Injectable()
export class OtpUtils {
    async generateOtp() {
        return await crypto.randomInt(1000, 10000);
    }
}