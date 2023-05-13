import { email, prop, required } from "@rxweb/reactive-form-validators";

export class SendEmail {
    @prop({ defaultValue: "" })
    @required()
    name!: string;
    @email()
    @required()
    @prop({ defaultValue: "" })
    email!: string;
    @prop()
    phonenumber!:string
    @prop()
    subject!: string;
    @prop()
    body!: string;
}