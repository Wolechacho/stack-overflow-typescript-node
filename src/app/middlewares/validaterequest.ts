import { body, header } from 'express-validator';

export function validateSignUp() {
    return [
        body('username')
            .notEmpty()
            .trim()
            .escape()
            .withMessage("Username must not be empty"),
        body('password')
            .notEmpty()
            .trim()
            .escape()
            .isLength({ min: 5 })
            .withMessage("Password must not be empty and Length should be >= 5"),
        body('email')
            .notEmpty()
            .trim()
            .isEmail()
            .withMessage("Email must not be empty and be Valid")
    ]
}

export function validateSignIn() {
    return [
        body('email')
            .notEmpty()
            .trim()
            .isEmail()
            .withMessage("Email must not be empty and valid")
    ]
}

export function validateQuestion() {
    return [
        body('title')
            .notEmpty()
            .trim()
            .withMessage("Title must not be empty and valid"),
        body('text')
            .notEmpty()
            .trim()
            .withMessage("Title must not be empty and valid"),
        body('userId')
            .notEmpty()
            .trim()
            .withMessage("UserId must not be empty and valid"),
        body('tags')
            .isArray()
            .notEmpty()
            .withMessage("tags must not be empty and valid"),
        header('Authorization')
            .notEmpty()
            .withMessage("Authorization header must not be empty")


    ]
}

export function validateVote() {
    return [
        body('questionId')
            .notEmpty()
            .trim()
            .withMessage("questionId must not be empty and valid")

    ]
}


export function validateAnswer() {
    return [
        body('text')
            .notEmpty()
            .trim()
            .withMessage("Title must not be empty and valid"),
        body('questionId')
            .notEmpty()
            .trim()
            .withMessage("Title must not be empty and valid"),
        body('userId')
            .notEmpty()
            .trim()
            .withMessage("QuestionId must not be empty and valid"),
        header('Authorization')
            .notEmpty()
            .withMessage("Authorization header must not be empty")
    ]
}