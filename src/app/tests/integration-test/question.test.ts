import app from '../../app';
import request from 'supertest';
import { User } from '../../../database/models/user';
import { Question } from '../../../database/models/question';
import { Answer } from '../../../database/models/answer';
import { Subscription } from '../../../database/models/subscription';
import QuestionRepository from '../../../app/DAO/question-dao';


describe("POST / Question End point", () => {
    let token = "";
    let userId = "";
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


    test("should create question", async (done) => {

        //Arrange
        const data = {
            title: "what is undefined in javascript",
            text: "In JS it doesn't seem possible to check if an argument passed to a function is actually of the type 'error' or an instance of Error",
            userId: userId,
            tags: ["javascript", "node.js"]
        }

        //Act
        const result = await request(app)
            .post('/api/v1/question')
            .set('Authorization', `Bearer ${token}`)
            .send(data)


        //Assert
        expect(result.statusCode).toEqual(201);
        done();
    });
});


describe("POST / Downvote Question End point", () => {
    let token = "";
    let userId = "";
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

        const questionData = {
            title: "what is undefined in javascript",
            text: "In JS it doesn't seem possible to check if an argument passed to a function is actually of the type 'error' or an instance of Error",
            userId: userId,
            tags: "javascript, node.js"
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


    test("should downvote question", async (done) => {

        //Arrange
        const data = {
            questionId: questionId,
        }

        //Act
        const result = await request(app)
            .post('/api/v1/question/downvote')
            .set('Authorization', `Bearer ${token}`)
            .send(data)


        //Assert
        expect(result.statusCode).toEqual(200);
        done();
    });
});


describe("POST / Upvote Question End point", () => {
    let token = "";
    let userId = "";
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

        const questionData = {
            title: "what is undefined in javascript",
            text: "In JS it doesn't seem possible to check if an argument passed to a function is actually of the type 'error' or an instance of Error",
            userId: userId,
            tags: "javascript, node.js"
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


    test("should upvote question", async (done) => {

        //Arrange
        const data = {
            questionId: questionId,
        }

        //Act
        const result = await request(app)
            .post('/api/v1/question/upvote')
            .set('Authorization', `Bearer ${token}`)
            .send(data)


        //Assert
        expect(result.statusCode).toEqual(200);
        done();
    });
});
