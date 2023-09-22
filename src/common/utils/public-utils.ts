import { Injectable } from "@nestjs/common";
import slugify from 'slugify-persian'

@Injectable()
export class PublicUtils {
    async generateSlugify(text : string){
        return slugify(text);
    }
}