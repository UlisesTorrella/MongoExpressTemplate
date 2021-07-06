import { NextFunction, Request, Response } from "express";
import { Todo } from 'src/db/Todo'; 

export async function fetchAll(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
        const todos = await Todo.find(); 
        res.json({ 
            title: 'Todos list', 
            todos: todos
        });
    }
    else {
      res.status(401).send("Please log in");
    }
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