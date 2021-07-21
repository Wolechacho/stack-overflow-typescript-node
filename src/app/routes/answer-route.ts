import { Router } from "express";
import AnswerController from "../controllers/answercontroller";
import {authourizeResource} from '../middlewares/authourizeresource';
import { validateAnswer } from '../middlewares/validaterequest';


const router = Router();

router.post('/', validateAnswer(), authourizeResource,AnswerController.answer);

export default router;