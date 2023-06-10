import { BaseEntity } from "../models/base-entity.model";
import { UserTypeEnum } from "../models/enums";
export class UserTypes extends BaseEntity {
    userType: UserTypeEnum;
    desc: string;
}

