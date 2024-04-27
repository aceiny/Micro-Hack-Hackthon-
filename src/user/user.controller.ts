import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
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
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/users/:OrganisationId")
  @UseGuards(AuthGuard())
  async GetUsers(@Param("OrganisationId") OrganisationId: ObjectId) {
    return this.userService.GetUsers(OrganisationId);
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

  @Get("/:token")
  @UseGuards(AuthGuard())
  async CheckUserToken(@Param("token") Token: string) {
    return {
      Message: "valid token",
      StatusCode: 200,
    };
  }
  @Get("")
  @UseGuards(AuthGuard())
  async GetUserData(@GetUser() User: any) {
    return this.userService.GetUserData(User.Id, User.Role);
  }
  @Put("/:UserId")
  @UseGuards(AuthGuard())
  async UpdateUser(
    @Param("UserId") UserId: ObjectId,
    @Body() UpdateUserDto: CreateUserDto,
  ) {
    return this.userService.UpdateUserDate(UserId, UpdateUserDto);
  }
}
