import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { OrganisationService } from "./organisation.service";
import {
  CreateOrganisationDto,
  LoginOrganisationDto,
} from "./organisation.types";

@Controller("organisation")
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Get("")
  async GetOrganisation() {
    return this.organisationService.GetOrganisation();
  }
  @Post("/signup")
  @UsePipes(ValidationPipe)
  async SignUpOrganisation(@Body() SignUpDto: CreateOrganisationDto) {
    return this.organisationService.SignUpOrganisation(SignUpDto);
  }
  @UsePipes(ValidationPipe)
  @Post("/login")
  async LoginOrganisation(@Body() LoginDto: LoginOrganisationDto) {
    return this.organisationService.LoginOrganisation(LoginDto);
  }
}
