import { IsNotEmpty, IsString } from "class-validator"

class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    Role_Name:string

    @IsString()
    @IsNotEmpty()
    Description:string
}