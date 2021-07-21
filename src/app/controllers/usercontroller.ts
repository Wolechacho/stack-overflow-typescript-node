import { Request, Response } from "express";
import { validationResult } from "express-validator";
import UserRepository from "../DAO/user-dao"
import * as bcrypt from "bcrypt"
import { sign } from "jsonwebtoken"
import { web_token_info, crypto_info } from "../config/development.json"
import { StatusCodes } from "http-status-codes"



class UserController {
    static async signUp(req: Request, res: Response) {
        const errors = validationResult(req);

        //return if validation fails
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).send({ validationErrors: errors });
        }

        const email = req.body.email;
        try {
            let userDetails = await UserRepository.getUserbyEmail(email);

            //email not found
            if (userDetails !== null) {
                return res.status(StatusCodes.OK).send({ auth: false, token: null, Error: "Provided Email already registered" });
            }
            let hashPassword = bcrypt.hashSync(req.body.password, crypto_info.salt_round);

            //change this later
            let newUser = { username: req.body.username, email: req.body.email, password: hashPassword };
            const result = await UserRepository.create(newUser)

            if (result) {
                const { secret, expiresIn } = web_token_info
                const token = sign({ id: result.userId }, secret, { expiresIn: expiresIn });
                return res.status(StatusCodes.CREATED).send({ auth: true, token: token, message: "Sign up Successful" });
            }

        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ auth: false, token: null, Error: err.message });
        }
        return res.status(StatusCodes.OK).send({ auth: false, token: null, message: "Error saving. Try again later" });
    }

    static async signIn(req: Request, res: Response) {

        //validate the result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).send({ validationErrors: errors });
        }

        try {
            const decodedUser = await UserRepository.getUserbyId(res.locals.jwtPayload.id);
            if (decodedUser == null || decodedUser.email !== req.body.email) {
                return res.status(StatusCodes.UNAUTHORIZED).send({ user: null, message: "No User Information. Please do sign up" });
            }
            return res.status(StatusCodes.OK).send({ user: { email: decodedUser.email, userId: decodedUser.userId, username: decodedUser.username }, message: "User Info Retrieved" });
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ ErrorMessage: err.message });
        }
    }
}
export default UserController