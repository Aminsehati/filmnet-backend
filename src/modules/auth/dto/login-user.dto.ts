import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, Length } from "class-validator";

export class LoginUserDto {
    @ApiProperty({ example: "" })
    @IsNotEmpty()
    @IsPhoneNumber('IR')
    username: string

    @ApiProperty({ example: "" })
    @IsNotEmpty()
    @Length(8)
    password: string
}