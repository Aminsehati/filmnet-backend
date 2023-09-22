import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPassportNumber, IsPhoneNumber, Length } from "class-validator";

export class VerifyOtpDto {
    @ApiProperty({})
    @IsNotEmpty()
    @IsPhoneNumber('IR')
    phone_number: string

    @ApiProperty({})
    @IsNotEmpty()
    @Length(4)
    otp: string
}