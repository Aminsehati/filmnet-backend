import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashUtils {
    async hashString(text: string) {
        const saltRounds = 10;

        const hashedString = await bcrypt.hash(text, saltRounds);
        return hashedString;
    }
    async verifyString(text: string, hashText: string) {
        return await bcrypt.compare(text, hashText);
    }
}