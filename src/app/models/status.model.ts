import { BaseEntity } from "../models/base-entity.model";
import{StatusCodeEnum} from "../models/enums"
export class Status extends BaseEntity {
    statusCode: StatusCodeEnum;
    desc: string | null;
}

