import app from '../../app';
import request from 'supertest';
import { User } from '../../../database/models/user';
import { Question } from '../../../database/models/question';
import { Answer } from '../../../database/models/answer';
import { Subscription } from '../../../database/models/subscription';
import QuestionRepository from '../../../app/DAO/question-dao';


describe("POST / Answer End point", () => {
    let token = "";
    let token2 = "";
    let userId = "";
    let userId2 = "";
    let questionId = "";
    beforeEach(async () => {
        const data = { username: "charles", password: "xxxxx", email: "wolecharles@gmail.com" }
        const signUpResult = await request(app)
            .post('/api/v1/user/signup')
            .send(data)
        token = signUpResult.body.token;

        const signInData = { email: "wolecharles@gmail.com" };
        const signInResult = await request(app)
            .post('/api/v1/user/signin')
            .set('Authorization', `Bearer ${token}`)
            .send(signInData);
        userId = signInResult.body.user.userId;

        const data2 = { username: "adenigbagbe", password: "xenovhh", email: "adewole@gmail.com" }
        const signUpResult2 = await request(app)
            .post('/api/v1/user/signup')
            .send(data2)
        token2 = signUpResult2.body.token;

        const signInData2 = { email: "adewole@gmail.com" };
        const signInResult2 = await request(app)
            .post('/api/v1/user/signin')
            .set('Authorization', `Bearer ${token2}`)
            .send(signInData2);

        userId2 = signInResult2.body.user.userId;

        const questionData = {
            title: "what is undefined in javascript",
            text: "In JS it doesn't seem possible to check if an argument passed to a function is actually of the type 'error' or an instance of Error",
            userId: userId,
            tags: "javascript,node.js"
        }
        const questionResult = await QuestionRepository.create(questionData);
        questionId = questionResult.questionId;
    });

    afterEach(async () => {
        await Subscription.destroy({
            where: {}
        })
        await Answer.destroy({
            where: {}
        })

        await Question.destroy({
            where: {}
        })

        await User.destroy({
            where: {}
        })
    });


    test("should create answer", async (done) => {

        //Arrange
        const data = {
            questionId: questionId,
            text: "the stock is bearish",
            userId: userId2
        }

        //Act
        const result = await request(app)
            .post('/api/v1/answer')
            .set('Authorization', `Bearer ${token2}`)
            .send(data)


        //Assert
        expect(result.statusCode).toEqual(200);
        expect(result.body.message).toEqual("Answer Added Successfully");
        done();
    });
});
