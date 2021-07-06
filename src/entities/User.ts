import { Document } from "mongoose";

type validatePasswordFunc = (pass: string) => Promise<any>;

export type UserDoc = Document &  {
    username: string;
    password: string;
    validatePassword: validatePasswordFunc; 
}
