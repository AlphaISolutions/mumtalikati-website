import { Status } from "./enums";

export class BaseEntity {
    iD!: number;
    status!: Status;
    createdTime!: string | null;
    modifyTime!: string | null;
}

