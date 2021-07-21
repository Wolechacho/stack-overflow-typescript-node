import {Question} from '../../database/models/question';
class QuestionRepository{
    static async create(question:any):Promise<any>{
        const {title,tags,text,userId} = question;
            console.log("question obj",question);
        const newQuestion = await Question.create({
            title : title,
            tags: tags,
            text: text,
            userId : userId
        });     
        return newQuestion
    }

    static async upvoteQuestion(id:string):Promise<Question>{
        const affectedResult = Question.increment('upvote', { where: { questionId: id }});
        return affectedResult;
    }

    static async downvoteQuestion(id:string):Promise<Question>{
        const affectedResult = Question.increment('downvote', { where: { questionId: id }});
        return affectedResult;
    }
}

export default QuestionRepository;
