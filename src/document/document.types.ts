import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

class CreateNewDocument {
  @IsNotEmpty()
  @ApiProperty()
  Document_Name: string;
  /*Document_Content blob /* blob or store in server and point to it ?*/
  @IsNotEmpty()
  @ApiProperty()
  Document_Description: string;
}
