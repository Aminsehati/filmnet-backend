import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class ChangePasswordAdminDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    confirm_password: string
}