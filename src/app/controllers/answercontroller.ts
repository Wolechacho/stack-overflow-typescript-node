import { Request, Response } from "express";
import { validationResult } from "express-validator";
import AnswerRepository from "../DAO/answer-dao";
import SubscriptionRepository from "../DAO/subscription-dao";
import MailService from "../services/mailservice";
import { smtp_provider } from "../config/development.json"
import { StatusCodes } from "http-status-codes"


class AnswerController {
    static async answer(req: Request, res: Response) {
        //validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).send({ validationErrors: errors });
        }
        const { userId, text, questionId } = req.body;
        let answerObj = {
            userId: userId,
            text: text,
            questionId: questionId
        }
        try {
            let answer = await AnswerRepository.create(answerObj);
            if (answer) {
                const subscribers = await SubscriptionRepository.get_Subscription_Question_by_QuestionId(answer.questionId);
                if (subscribers.length > 0) {
                    for (const subscriber of subscribers) {
                        const mailservice = new MailService(smtp_provider);
                        mailservice.sendMail(smtp_provider.user, subscriber.User.email, subscriber.Question.title, answer.text);

                    }
                }
                return res.status(StatusCodes.OK).send({ message: "Answer Added Successfully" });
            }
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err.message })
        }

    }

}
export default AnswerController;