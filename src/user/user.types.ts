import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Fullname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  Email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Password: string;

  @IsPhoneNumber()
  @ApiProperty()
  Phone: string;
}
export class LoginUserDto {
  @IsString()
  @ApiProperty()
  Username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Password: string;
}
