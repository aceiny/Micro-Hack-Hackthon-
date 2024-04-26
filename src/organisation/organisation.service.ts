import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Organisation } from "./organisation.schema";
import { Model } from "mongoose";
import {
  CreateOrganisationDto,
  LoginOrganisationDto,
} from "./organisation.types";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { AccountType } from "src/global/global.enums";
@Injectable()
export class OrganisationService {
  constructor(
    @InjectModel(Organisation.name)
    private readonly organisationModel: Model<Organisation>,
    private readonly jwtService: JwtService,
  ) {}

  async GetOrganisation() {
    return this.organisationModel.find();
  }
  async SignUpOrganisation(SignUpDto: CreateOrganisationDto) {
    const exist = await this.organisationModel.findOne({
      Email: SignUpDto.Email,
    });
    if (exist) {
      throw new ConflictException("Email already exist");
    }
    const { Password } = SignUpDto;
    try {
      const salt = bcrypt.genSaltSync(10);
      const HashPass = bcrypt.hashSync(Password, salt);
      const organisation = await this.organisationModel.create({
        ...SignUpDto,
        Password: HashPass,
      });
      if (!organisation) {
        throw new InternalServerErrorException("Organisation not created");
      }
      return {
        Token: this.jwtService.sign({
          Id: organisation._id,
          Role: AccountType.ORGANISATION,
        }),
      };
    } catch (err) {
      throw new InternalServerErrorException("Organisation not created");
    }
  }

  async LoginOrganisation(LoginDto: LoginOrganisationDto) {
    const organisation = await this.organisationModel.findOne({
      Email: LoginDto.Email,
    });
    if (!organisation) {
      throw new UnauthorizedException("invalid credentials");
    }
    if (!bcrypt.compareSync(LoginDto.Password, organisation.Password)) {
      throw new UnauthorizedException("invalid credentials");
    }
    return {
      Token: this.jwtService.sign({
        Id: organisation._id,
        Role: AccountType.ORGANISATION,
      }),
    };
  }
}
