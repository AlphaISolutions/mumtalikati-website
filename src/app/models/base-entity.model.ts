import { StatusCodeEnum } from "./enums";

export class BaseEntity {
    id: number;
    status!: StatusCodeEnum;
    createdTime!: string | null;
    modifyTime!: string | null;
}

