import { TodoDoc } from "@entities/Todo";
import { NextFunction, Request, Response } from "express";
import { Todo } from 'src/db/Todo';
import { Todo as TodoType } from 'src/entities/Todo'; 

export async function fetchAll(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
        let todos = []
        if(req.query.sort){
            todos = await Todo.find({...req.body}).sort(req.query.sort)
        }
        else {
            todos = await Todo.find({...req.body});
        }
        res.json({ 
            title: 'Todos list', 
            todos: todos
        });
    }
    else {
        res.status(401).send("Please log in");
    }
    next();
}

export async function pushTodo(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
        await Todo.create(req.body);
        res.status(200).send("Created");
    }
    else {
        res.status(401).send("Please log in");
    }
}

export async function updateTodo(req: Request<{}, {}, TodoDoc>, res: Response, next: NextFunction) {
    const todo = req.body;    
    await Todo.updateOne({_id: todo._id}, {...todo}, { runValidators: true });
    res.status(200).send("Updated");
}