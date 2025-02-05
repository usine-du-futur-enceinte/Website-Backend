import { NextFunction, Request, Response } from 'express';
import * as exampleService from '../services/example.service';

export async function getExamplesByName(req: Request, res: Response, next: NextFunction) {
    try {
        const name = req.params.search;
        const examples = await exampleService.getExamplesByName(name);
        res.json(examples);
    } catch (e) {
        next(e);
    }
}