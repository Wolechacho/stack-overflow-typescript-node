import { Question } from '../../database/models/question';
import {Subscription} from '../../database/models/subscription';
import { User } from '../../database/models/user';

class SubscriptionRepository{
    static async subscribeUser(model:any):Promise<any>{
         const {questionId,userId} = model;
        const newSubscription = await Subscription.create({
            questionId : questionId,
            userId : userId
        });     
        return newSubscription;
    }

    static async get_Subscription_Question_by_QuestionId(id:string):Promise<any>{
        try{
            return Subscription.findAll({
                include:[{model:Question,attributes:['title','text'],where:{questionId:id}},{model:User,attributes:['email']}]
            })
        }catch(err){
            throw err
        }
    }

    static async get_Subscription_User_by_QuestionId(id:string):Promise<any>{
        try{
            return Subscription.findAll({
                where:{questionId:id},include:[{model:User,attributes:['email']}]
            })
        }catch(err){
            throw err
        }
    }
}

export default SubscriptionRepository