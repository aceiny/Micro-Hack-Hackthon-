import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Model, ObjectId } from "mongoose";
import { CreateUserDto, LoginUserDto } from "./user.types";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { AccountType } from "src/global/global.enums";
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  async GetUsers() {
    return this.userModel.find();
  }
  async CreateUser(CreateUserDto: CreateUserDto, OrganisationID: ObjectId) {
    const exist = await this.userModel.findOne({
      Username: CreateUserDto.Username,
    });
    if (exist) {
      throw new ConflictException("Username already exist");
    }
    const { Password } = CreateUserDto;
    try {
      const salt = bcrypt.genSaltSync(10);
      const HashPass = bcrypt.hashSync(Password, salt);
      const user = await this.userModel.create({
        ...CreateUserDto,
        Organisation_Id: OrganisationID,
        Password: HashPass,
      });
      if (!user) {
        throw new InternalServerErrorException("User not created");
      }
      return user;
    } catch (err) {
      throw new InternalServerErrorException("User not created");
    }
  }
  async LoginUser(LoginDto: LoginUserDto) {
    const user = await this.userModel.findOne({ Username: LoginDto.Username });
    if (!user) {
      throw new UnauthorizedException("invalid credentials");
    }
    if (!bcrypt.compareSync(LoginDto.Password, user.Password)) {
      throw new UnauthorizedException("invalid credentials");
    }
    return {
      Token: this.jwtService.sign({ Id: user._id, Role: AccountType.WORKER }),
    };
  }
}
