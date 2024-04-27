import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Role_Name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Role_Color : string;
}
