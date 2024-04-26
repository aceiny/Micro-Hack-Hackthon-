import { Controller } from "@nestjs/common";
import { Access_Control } from "./access_controle.schema";
import { AccessControlService } from "./access_control.service";

@Controller("access-control")
export class AccessControlController {
    constructor(
        private readonly accesscontrolService : AccessControlService
    ){}
}
