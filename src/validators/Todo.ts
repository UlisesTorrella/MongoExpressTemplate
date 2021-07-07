import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

export function isTodoDoc (req: Request, res: Response, next: NextFunction) {
    if (req.body 
        && '_id' in req.body
        && 'description' in req.body
        && 'done' in req.body) {
        next();
    }
    else {
        res.status(400).send("Missing values");
    }
} 

export function isNewTodoDoc (req: Request, res: Response, next: NextFunction) {
    if (req.body 
        && 'description' in req.body
        && 'done' in req.body) {
        next();
    }
    else {
        res.status(400).send("Missing values");
    }
} 