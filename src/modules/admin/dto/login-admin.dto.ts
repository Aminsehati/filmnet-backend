import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Min, MinLength } from "class-validator";

export class LoginAdminDto {
    @ApiProperty()
    @IsNotEmpty()
    username: string


    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    password: string
}