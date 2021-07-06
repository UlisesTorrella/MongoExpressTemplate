import { Document } from "mongoose";

export type Todo = {
    description: string;
    done: Boolean;
    date: Date
}

export type TodoDoc = Document & Todo
