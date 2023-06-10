import { UserDetail } from "../models/userdetail.model";
import { UserTypes } from "./userTypes.model";


export class User {
    userDetails: UserDetail[] | null;
    userTypes: UserTypes[] | null;
    userIdDetails:  null;
    name: string | null;
    userName: string | null;
    contact: string | null;
    email: string | null;
    password: string | null;
    cNIC: string | null;
    nationality: string | null;
    dob: string | null;
    gender: string | null;
    registerFromWeb: boolean | null;
    authorizedSignatoryID: string | null;
    token: string | null;
}