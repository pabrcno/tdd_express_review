import request from "supertest";
import app from "../src/app";
import { UsersEndpoints } from "../src/endpoints/users/UsersEndpoints";
import { UsersPostRequest } from "../src/domain/users/UsersRequests";
import { UsersPostMessages } from "../src/constants";
import User from "./../src/infrastructure/sequelize/User";
import sequelize from "../src/infrastructure/sequelize";

beforeAll(async () => {
  await sequelize.sync();
});

beforeEach(async () => {
  return await User.destroy({ truncate: true });
});

describe("User Registration", () => {
  const testUser: UsersPostRequest = {
    username: "user1",
    email: "user1@email.com",
    password: "Password",
  };

  it("returns 200 OK when signup request is valid", (done) => {
    request(app)
      .post(UsersEndpoints.POST)
      .send(testUser)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it("returns success message when signup request is valid", (done) => {
    request(app)
      .post(UsersEndpoints.POST)
      .send(testUser)
      .then((response) => {
        expect(response.body.message).toBe(UsersPostMessages.SUCCESS);
        done();
      });
  });

  it("saves the user  to database", (done) => {
    request(app)
      .post(UsersEndpoints.POST)
      .send(testUser)
      .then(() => {
        User.findAll().then((users) => {
          expect(users.length).toBe(1);
          done();
        });
      });
  });

  it("saves the username and email to database", (done) => {
    request(app)
      .post(UsersEndpoints.POST)
      .send(testUser)
      .then(() => {
        User.findAll().then((users) => {
          const [savedUser] = users;
          const { username, email } = savedUser.get();
          expect(username).toBe(testUser.username);
          expect(email).toBe(testUser.email);
          done();
        });
      });
  });
});
