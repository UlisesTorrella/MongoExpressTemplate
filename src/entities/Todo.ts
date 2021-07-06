import { Document } from "mongoose";

export type TodoDoc = Document &  {
    description: string;
    done: Boolean;
    date: Date
}
