import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AssignUserRoleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  User_Id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  Role_Id: string;
}
