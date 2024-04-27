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
import { RedisService } from "src/redis/redis.service";
import { Organisation } from "src/organisation/organisation.schema";
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Organisation.name)
    private readonly organisationModel: Model<Organisation>,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}
  async GetUsers(OrganisationId: ObjectId) {
    return this.userModel.find({
      Organisation_Id: OrganisationId,
    });
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
  async GetUserData(UserId: ObjectId, UserRole: string) {
    if (UserRole == AccountType.WORKER) {
      const IsCashed = await this.redisService.KeyExists(`user-${UserId}`);
      if (IsCashed) {
        try {
          return this.redisService.GetKey(`user-${UserId}`);
        } catch (error) {
          const user = await this.userModel
            .findById(UserId)
            .populate("Organisation_Id", "-Password");
          if (!user) {
            throw new UnauthorizedException("User not found");
          }
          return user;
        }
      } else {
        const user = await this.userModel
          .findById(UserId)
          .populate("Organisation_Id", "-Password");
        if (!user) {
          throw new UnauthorizedException("User not found");
        }
        user.Password = undefined;
        await this.redisService.SetKey(`user-${UserId}`, user);
        return user;
      }
    } else {
      const IsCashed = await this.redisService.KeyExists(
        `organisation-${UserId}`,
      );
      if (IsCashed) {
        try {
          return this.redisService.GetKey(`organisation-${UserId}`);
        } catch (error) {
          const user = await this.organisationModel.findById(UserId);
          if (!user) {
            throw new UnauthorizedException("organisation not found");
          }
          return user;
        }
      } else {
        const user = await this.organisationModel.findById(UserId);
        if (!user) {
          throw new UnauthorizedException("organisation not found");
        }
        user.Password = undefined;
        await this.redisService.SetKey(`organisation-${UserId}`, user);
        return user;
      }
    }
  }
  async UpdateUserDate(UserId: ObjectId, UpdateData: any) {
    const user = await this.userModel.findByIdAndUpdate(UserId, UpdateData, {});
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    return user;
  }
}
