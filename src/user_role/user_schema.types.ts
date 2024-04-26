import { IsNotEmpty, IsString } from "class-validator";

export class AssignUserRoleDto {
  @IsNotEmpty()
  @IsString()
  User_Id: string;

  @IsNotEmpty()
  @IsString()
  Role_Id: string;
}
