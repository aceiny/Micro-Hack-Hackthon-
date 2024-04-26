import { IsString } from "class-validator";

class CreateOrganisationDto {
  @IsString()
  Name: string;
  @IsString()
  Domain_Name: string;
}
