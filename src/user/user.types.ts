import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  Fullname: string;

  @IsString()
  @IsNotEmpty()
  Username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @IsString()
  @IsNotEmpty()
  Password: string;

  @IsPhoneNumber()
  Phone: string;
}
export class LoginUserDto {
  @IsString()
  Username: string;

  @IsString()
  @IsNotEmpty()
  Password: string;
}
