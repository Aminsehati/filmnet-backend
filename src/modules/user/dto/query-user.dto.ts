import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional } from "class-validator";
import { Gender, statusUser } from "src/common/types/public.types";

export class QueryUserDto {
    @ApiProperty({ required: false, example: 10 })
    @IsOptional()
    @IsInt()
    limit: number

    @ApiProperty({ required: false, example: 1 })
    @IsOptional()
    @IsInt()
    skip: number

    @IsEnum(Gender)
    @ApiProperty({
        enum: Gender,
        required: false
    })
    @IsOptional()
    gender: Gender;

    @IsEnum(statusUser)
    @ApiProperty({
        enum: statusUser,
        required: false
    })
    @IsOptional()
    status: statusUser;
}