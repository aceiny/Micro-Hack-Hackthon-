import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, isNotEmpty } from "class-validator";

export class CreateOrganisationDto {
  @IsString()
  @ApiProperty()
  Name: string;
  @IsEmail()
  @ApiProperty()
  Email: string;
  @IsString()
  @ApiProperty()
  Password: string;
  @IsString()
  @ApiProperty()
  Domain_Name: string;
  @IsNotEmpty()
  @ApiProperty()
  Number_Of_Employees: number;
}
export class LoginOrganisationDto {
  @IsString()
  @ApiProperty()
  Email: string;
  @IsString()
  @ApiProperty()
  Password: string;
}
