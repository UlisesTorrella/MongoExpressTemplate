import { UserTodoDoc } from "@entities/Todo";
import mongoose, { Model, Schema } from "mongoose";

const TodoSchema = new Schema({
    description: {
        required: true,
        type: String,
        index: {unique: true},
        maxLength: 256
    },
    done: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: false
    }
});

const UserTodoSchema = new Schema({
    user_id: {
        required: true,
        type: String,
        index: {unique: true}
    },
    todos: [TodoSchema]
})
const UserTodo: Model<UserTodoDoc> = mongoose.model<UserTodoDoc>('Todo', UserTodoSchema);

export { UserTodo };