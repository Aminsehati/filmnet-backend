import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
export class UpdateSubscriptionByAdminDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    title: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    icon_url: string

    @ApiProperty()
    @IsInt()
    @Min(0)
    @Max(100)
    discount_percent: number

    @ApiProperty()
    @IsInt()
    @IsOptional()
    price: number

    @ApiProperty()
    @IsOptional()
    @IsInt()
    timestamp:number
} 