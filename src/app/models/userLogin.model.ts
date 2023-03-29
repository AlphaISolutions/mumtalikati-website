import { prop } from "@rxweb/reactive-form-validators";

export class UserLogin {
    @prop()
    userName!: string;
    @prop()
    password!: string;
}