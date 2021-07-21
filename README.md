# Introduction

The API is focused on miniature prototype of stackoverflow application. It was implemented with the below set of features

- User signup
- User sign in
- Ask Questions
- Upvote or downvote question
- Answer Question
- Subscribe for answered questions

# How to Run

Follow the below steps to run the source code

### Configuration

If you feel the need to change the configuration of the project to avoid application port issue or connect to an existing instance of the database, follow the below steps

- Navigate to the config directory under the app directory and tweak the development.json settings
- Navigate to the config directory under the database directory and tweak the database.json settngs

### Build

1. Clone the Repository source code
2. Run **npm install** to download dependencies packages
3. Run **npm run build** to build the project
4. Run **npm sequelize:create** to create the database
5. Run **npm run sequelize:migrate-up** to create the database and tables
6. Run **npm run sequelize:seed-undo** to seed data to the tables

# Postman API Docs

The postman link for the documentation of the APIs created for the application is below :
https://www.getpostman.com/collections/0fa4fc3a2c47883448da

# Test

To run the test, enter the command **npm test** for automated test of the application

# Error Codes

The Error codes for the application are highlighted below

- 200 (Ok)
- 201 (Content-Created)
- 401 (Unauthourized)
- 403 (Forbidden)
- 400 (Bad Request)
- 500 (Internal server Error)

# Tools and Stack

- Typescript
- Node.js(v+12)
- Mysql
- Sequelize as ORM
- Json web token (jwt) for authentication
- Jest for test
- Operating system (Windows 10)
