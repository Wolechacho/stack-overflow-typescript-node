import { Request, Response } from "express";
import { validationResult } from "express-validator";
import QuestionRepository from "../DAO/question-dao";
import SubscriptionRepository from "../DAO/subscription-dao";
import { formatTags } from "../helpers/formattags";
import { StatusCodes } from "http-status-codes"


class QuestionController {
    static async askQuestion(req: Request, res: Response) {

        //validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("errors", JSON.stringify(errors));

            return res.status(StatusCodes.BAD_REQUEST).send({ validationErrors: errors });
        }
        const { title, tags, text, userId } = req.body;

        //format the tags
        const concatTags = formatTags(tags);

        //build the question model
        let question = {
            title: title,
            text: text,
            tags: concatTags,
            userId: userId
        };
        try {
            const result = await QuestionRepository.create(question);
            if (result) {
                return res.status(StatusCodes.CREATED).send({ questionId: result.questionId, message: "Question successfully saved" })
            }
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ questionId: null, message: err.message })
        }

    }

    static async upvote(req: Request, res: Response) {
        //validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).send({ validationErrors: errors });
        }
        try {
            const result = QuestionRepository.upvoteQuestion(req.body.questionId);
            return res.status(StatusCodes.OK).send({ message: "Question upvoted successfully" });
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err.message })
        }

    }

    static async downvote(req: Request, res: Response) {
        //validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).send({ validationErrors: errors });
        }
        try {
            const result = QuestionRepository.downvoteQuestion(req.body.questionId);
            if (result) {
                return res.status(StatusCodes.OK).send({ message: "Question downvoted successfully" });
            }
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err.message })
        }
    }

    static async subscribe(req: Request, res: Response) {
        //validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).send({ validationErrors: errors });
        }

        const { userId, questionId } = req.body;
        const subscriptionModel = {
            userId: userId,
            questionId: questionId
        };
        try {
            const result = await SubscriptionRepository.subscribeUser(subscriptionModel);
            if (result) {
                return res.status(StatusCodes.CREATED).send({ subscriptionId: result.subscriptionId, message: "Subscription successfully saved" })
            }
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ subscriptionId: null, message: err.message })
        }
    }
}

export default QuestionController;