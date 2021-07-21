import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'
import { web_token_info } from '../config/development.json'
import { StatusCodes } from "http-status-codes"


export function authourizeResource(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === undefined)
        return res.status(StatusCodes.UNAUTHORIZED).send({ user: null, message: "provide a token in the header" });

    try {
        let jwtPayload = jwt.verify(token, web_token_info.secret);
        console.log("jwtPayload", jwtPayload);
        res.locals.jwtPayload = jwtPayload;
        next()

    } catch (err) {
        return res.status(StatusCodes.FORBIDDEN).send({ user: null, message: err.message });
    }
}