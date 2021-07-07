import { Document } from "mongoose";

export type Todo = {
    description: string;
    done: Boolean;
    date: Date
}

export type TodoDoc = Document & Todo

export type UserTodoDoc = Document & {
    user_id: string;
    todos: Todo[];
}