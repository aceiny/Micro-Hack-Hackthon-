import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

class CreateUserDto {
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
  password: string;

  @IsPhoneNumber()
  Phone: string;
}
