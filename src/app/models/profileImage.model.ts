import { prop } from "@rxweb/reactive-form-validators";

export class ProfileImage {
    userID!: number | null;
    @prop({ defaultValue: "https://p.kindpng.com/picc/s/24-248729_stockvader-predicted-adig-user-profile-image-png-transparent.png" })
    imageString!: string | null;
}