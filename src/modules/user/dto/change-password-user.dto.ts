import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
export class ChangePassworUserdDto {
    @ApiProperty({ example: "" })
    @IsNotEmpty()
    @IsString()
    @Length(8)
    password: string

    @ApiProperty({ example: "" })
    @IsNotEmpty()
    @IsString()
    @Length(8)
    confirm_password: string
}