import app from '../../app';
import request from 'supertest';
import { User } from '../../../database/models/user';



describe("POST / User End point", () => {
  let token = "";

  afterAll(async () => {
    await User.destroy({
      where: {}
    })

  });
  test("should create user", async (done) => {

    //Arrange
    const data = { username: "charles", password: "xxxxx", email: "wolecharles@gmail.com" }

    //Act
    const result = await request(app)
      .post('/api/v1/user/signup')
      .send(data)

    //Assert
    expect(result.statusCode).toEqual(201);
    expect(result.body.auth).toEqual(true);
    token = result.body.token;
    done();
  });

  test("should sign user up", async (done) => {

    //Arrange
    const data = { email: "wolecharles@gmail.com" };
    //Act
    const result = await request(app)
      .post('/api/v1/user/signin')
      .set('Authorization', `Bearer ${token}`)
      .send(data)

    //Assert
    expect(result.statusCode).toEqual(200);
    expect(result.body.user.email).toEqual("wolecharles@gmail.com");
    expect(result.body.user.username).toEqual("charles");
    done();
  });
});
