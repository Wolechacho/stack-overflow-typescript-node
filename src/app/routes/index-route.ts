import userroute from './user-route';
import questionroute from './question-route';
import answerroute from './answer-route';
import {Router} from 'express'


const routes = Router();
routes.use('/user',userroute);
routes.use('/question',questionroute);
routes.use('/answer',answerroute);



export default routes;