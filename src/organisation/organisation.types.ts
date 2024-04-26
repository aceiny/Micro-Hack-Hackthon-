import { IsEmail, IsNotEmpty, IsString, isNotEmpty } from "class-validator";

class CreateOrganisationDto {
  @IsString()
  Name: string;
  @IsEmail()
  Email: string;
  @IsString()
  Password: string;
  @IsString()
  Domain_Name: string;
  @IsNotEmpty()
  Number_Of_Employees: number;
}
