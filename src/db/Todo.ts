import { TodoDoc } from "@entities/Todo";
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
const Todo: Model<TodoDoc> = mongoose.model<TodoDoc>('Todo', TodoSchema);

export { Todo };