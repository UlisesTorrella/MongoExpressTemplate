import { assert } from "console";
import { NextFunction, Response, Request } from "express";
import { UserTodo } from "./Todo";

// Shouldn't be called without a authenticated user
export default async function injectTodos(req: Request, res: Response, next: NextFunction) {
    assert(req.user)
    const inDb = await UserTodo.findOne(
        {user_id: req.user!._id}
    );;
    if (!inDb) {
        req.userTodos = await UserTodo.create({
            user_id: req.user!._id,
            todos: []
        })
    }
    else {
        req.userTodos = inDb;
    }
    next();
}