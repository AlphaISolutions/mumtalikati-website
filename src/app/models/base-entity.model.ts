import { StatusCodeEnum } from "./enums";

export class BaseEntity {
    iD!: number;
    status!: StatusCodeEnum;
    createdTime!: string | null;
    modifyTime!: string | null;
}

