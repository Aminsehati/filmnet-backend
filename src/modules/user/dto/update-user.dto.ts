import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsInt, IsISO8601, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength, minLength } from "class-validator";
import { Gender, statusUser } from "src/common/types/public.types";

export class UpdateUserByAdminDto {
    @ApiProperty()
    @IsOptional()
    name: string

    @ApiProperty()
    @IsOptional()
    @MinLength(8)
    password: string

    @ApiProperty()
    @IsOptional()
    @IsInt()
    balance: number

    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email: string

    @ApiProperty()
    @IsInt()
    @IsOptional()
    subscription_remaining_in_day: number

    @ApiProperty()
    @IsString()
    @IsOptional()
    flag: string


    @IsEnum(statusUser)
    @ApiProperty({
        enum: statusUser
    })
    status: statusUser;

    @IsEnum(Gender)
    @ApiProperty({
        enum: Gender
    })
    gender: Gender;


    @ApiProperty()
    @IsOptional()
    @IsString()
    img_url: string


    @ApiProperty()
    @IsOptional()
    @IsPhoneNumber('US')
    phone_number: string

    @ApiProperty({ example: '2022-11-06' })
    @IsNotEmpty()
    @IsISO8601()
    brith_day: string;

}