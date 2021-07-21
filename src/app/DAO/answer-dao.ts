import { Answer } from "../../database/models/answer";

class AnswerRepository{
    static async create(answer:any):Promise<any>{
         const {questionId,text,userId} = answer;
        const newAnswer= await Answer.create({
            userId : userId,
            text: text,
            questionId : questionId
        });     
        return newAnswer
    }
}


export default AnswerRepository;
