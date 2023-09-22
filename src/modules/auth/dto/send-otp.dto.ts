import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPassportNumber, IsPhoneNumber } from "class-validator";

export class SendOtpDto {
    @ApiProperty({})
    @IsNotEmpty()
    @IsPhoneNumber('IR')
    phone_number:string
}