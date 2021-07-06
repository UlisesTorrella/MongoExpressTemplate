import { TodoDoc } from "@entities/Todo";
import { NextFunction, Request, Response } from "express";

export function sort(req: Request, res: Response, next: NextFunction) {
    if ('sort' in req.query) {

    }
    next()
}