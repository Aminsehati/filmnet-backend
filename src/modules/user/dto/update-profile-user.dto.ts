import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Gender } from "src/common/types/public.types";

export class UpdateProfileUserDto {
    @ApiProperty({ example: "" })
    @IsOptional()
    @IsString()
    name: string

    @ApiProperty({ example: "" })
    @IsOptional()
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty({ example: Gender.NONE })
    @IsOptional()
    @IsEnum(Gender)
    gender: Gender
}