import { UserTypes } from "../models/userTypes.model";
import { BaseEntity } from "../models/base-entity.model";

export class UserDetail extends BaseEntity {
    userTypeID: number | null;
    userTypes: UserTypes | null;
    userID: number | null;
    user:  null;
}