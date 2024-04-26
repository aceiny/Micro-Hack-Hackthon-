import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateUserDto, LoginUserDto } from "./user.types";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/jwt/role.guard";
import { Roles } from "src/jwt/roles.decorator";
import { AccountType } from "src/global/global.enums";
import { GetUser } from "src/jwt/get-user.decorator";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("")
  async GetUsers() {
    return this.userService.GetUsers();
  }

  @UseGuards(AuthGuard())
  @UseGuards(RolesGuard)
  @Roles(AccountType.ORGANISATION)
  @UsePipes(ValidationPipe)
  @Post("/create")
  async CreateUser(
    @Body() CreateUserDto: CreateUserDto,
    @GetUser() organisation: any,
  ) {
    return this.userService.CreateUser(CreateUserDto, organisation.Id);
  }
  @UsePipes(ValidationPipe)
  @Post("/login")
  async LoginUser(@Body() LoginDto: LoginUserDto) {
    return this.userService.LoginUser(LoginDto);
  }
}
