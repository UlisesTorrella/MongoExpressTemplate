import { TodoDoc } from "@entities/Todo";
import { assert } from "console";
import { NextFunction, Request, Response } from "express";
import { UserTodo } from 'src/db/Todo';
import { Todo as TodoType } from 'src/entities/Todo'; 

/*
This methods asume an user and its UserTodo table is available, this must be ensure in 
previous middlewares.
*/

export async function fetchAll(req: Request, res: Response, next: NextFunction) {
    assert(req.user && req.userTodos)
    console.log(req.userTodos);
    let usertodo = UserTodo.findOneAndUpdate(
        {user_id: req.user!._id},
        {user_id: req.user!._id, todos: []}, //model
        {upsert: true, new: true, runValidators: true}
    ); 
    let todos = [];
    if(req.query.sort){
        todos = await usertodo.find({...req.body}).sort(req.query.sort)
    }
    else {
        todos = await usertodo.find({...req.body});
    }
    res.json({ 
        title: 'Todos list', 
        user: req.user!.username,
        todos: todos
    });
    next();
}

export async function pushTodo(req: Request, res: Response, next: NextFunction) {
    assert(req.user && req.userTodos)
    const todo: TodoDoc = req.body;  
    await UserTodo.findOneAndUpdate(
        {user_id: req.user!._id},
        {$push: {todos: todo}},
        {upsert: true, new: true, runValidators: true}
    ); 
    res.status(200).send("Created");
}

export async function updateTodo(req: Request<{}, {}, TodoDoc>, res: Response, next: NextFunction) {
    assert(req.user && req.userTodos)
    const todo = req.body;
    const todoWithOutId = { ...todo };
    delete todoWithOutId._id;
    await UserTodo.findOneAndUpdate({
        user_id: req.user!._id,
        'todos._id': todo._id
    }, 
    { 
        $set: 
            {
                "todos.$": todo
            } 
    }
    );    
    res.status(200).send("Updated");
}