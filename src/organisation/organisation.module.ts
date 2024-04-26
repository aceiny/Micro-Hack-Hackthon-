import { Module } from "@nestjs/common";
import { OrganisationController } from "./organisation.controller";
import { OrganisationService } from "./organisation.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Organisation, OrganisationSchema } from "./organisation.schema";
import { JWTModule } from "src/jwt/jwt.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organisation.name, schema: OrganisationSchema },
    ]),
    JWTModule,
  ],
  controllers: [OrganisationController],
  providers: [OrganisationService],
})
export class OrganisationModule {}
