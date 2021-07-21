const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
module.exports = {
    up: async (queryInterface) => {
        //bulk insert users
        await queryInterface.bulkInsert('users', [
            { userId: uuidv4(), username: 'tanimomo', password: bcrypt.hashSync("xxxxx", 8), email: 'tanimomo@gmail.com' },
            { userId: uuidv4(), username: 'debofrank08', password: bcrypt.hashSync("yyyyyy", 8), email: 'debo@gmail.com' },
            { userId: uuidv4(), username: 'tobi45', password: bcrypt.hashSync("tobi43", 8), email: 'tobifunmi@gmail.com' },
            { userId: uuidv4(), username: 'kunlevc', password: bcrypt.hashSync("kunledude", 8), email: 'sensationalK@gmail.com' }
        ]);

        //query to get userIds
        const users = await queryInterface.sequelize.query(
            `SELECT userId from users;`
        );

        console.log("users", users)

        //bulk insert questions
        await queryInterface.bulkInsert('questions', [
            {
                questionId: uuidv4(), title: 'what is undefined in javascript', tags: "javascript,node.js", upvote: 0, downvote: 0, userId: users[0][0].userId,
                text: `In JS it doesn't seem possible to check if an argument passed to a function is actually of the type 'error' or an instance of Error`,
            }
        ]);


        //query to get questionIds
        const questions = await queryInterface.sequelize.query(
            `SELECT questionId from questions;`
        );


        //bulk insert subscriptions
        await queryInterface.bulkInsert('subscriptions', [
            { subscriptionId: uuidv4(), userId: users[0][1].userId, questionId: questions[0][0].questionId },
            { subscriptionId: uuidv4(), userId: users[0][2].userId, questionId: questions[0][0].questionId }
        ]);



        //bulk insert answers
        return queryInterface.bulkInsert('answers', [
            { answerId: uuidv4(), text: "the  stock is bearish", userId: users[0][3].userId, questionId: questions[0][0].questionId }
        ]);

    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('users', null, {});
        await queryInterface.bulkDelete('answers', null, {});
        await queryInterface.bulkDelete('subscriptions', null, {});
        return queryInterface.bulkDelete('questions', null, {});
    }
};