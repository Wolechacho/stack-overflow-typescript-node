import { Router } from "express";
import QuestionController from "../controllers/questioncontroller";
import {authourizeResource} from '../middlewares/authourizeresource';
import {validateQuestion,validateVote} from '../middlewares/validaterequest';

const router = Router();

router.post('/',validateQuestion(),authourizeResource,QuestionController.askQuestion);
router.put('/upvote',validateVote(),QuestionController.upvote);
router.put('/downvote',validateVote(),QuestionController.downvote);
router.post('/subscribe',QuestionController.subscribe);

export default router;