import { Router } from "express";
import UserController from '../controllers/usercontroller';
import {authourizeResource} from '../middlewares/authourizeresource';
import {validateSignUp,validateSignIn} from '../middlewares/validaterequest';

const router = Router();

router.post('/signup',validateSignUp(),UserController.signUp);
router.post('/signin',authourizeResource,validateSignIn(),UserController.signIn);


export default router;