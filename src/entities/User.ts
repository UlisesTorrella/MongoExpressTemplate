import { Document } from "mongoose";

type validatePasswordFunc = (pass: string) => Promise<any>;

export type UserDoc = Document &  {
    _id: string;
    username: string;
    password: string;
    validatePassword: validatePasswordFunc; 
}
