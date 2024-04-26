import { IsNotEmpty } from "class-validator";

class CreateNewDocument {
  @IsNotEmpty()
  Document_Name: string;
  /*Document_Content blob /* blob or store in server and point to it ?*/
  @IsNotEmpty()
  Document_Description: string;
}
