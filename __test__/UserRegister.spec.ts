import request from "supertest";
import app from "../src/app";
import { UsersEndpoints } from "../src/endpoints/users/UsersEndpoints";
import { UsersPostRequest } from "../src/domain/users/UsersRequests";
import { UsersPostMessages } from "../src/constants";
import User from "./../src/infrastructure/sequelize/User";
import sequelize from "../src/infrastructure/sequelize";
import bcrypt from "bcrypt";

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
    password: "P4ssword",
  };

  const postValidUser = async () => {
    return await request(app).post(UsersEndpoints.POST).send(testUser);
  };

  it("returns 200 OK when signup request is valid", (done) => {
    postValidUser().then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it("returns success message when signup request is valid", (done) => {
    postValidUser().then((response) => {
      expect(response.body.message).toBe(UsersPostMessages.SUCCESS);
      done();
    });
  });

  it("saves the user  to database", (done) => {
    postValidUser().then(() => {
      User.findAll().then((users) => {
        expect(users.length).toBe(1);
        done();
      });
    });
  });

  it("saves the username and email to database", (done) => {
    postValidUser().then(() => {
      User.findAll().then((users) => {
        const [savedUser] = users;
        const { username, email } = savedUser.get();
        expect(username).toBe(testUser.username);
        expect(email).toBe(testUser.email);
        done();
      });
    });
  });

  it("hashes password in db", (done) => {
    postValidUser().then(() => {
      User.findAll().then(async (users) => {
        const [savedUser] = users;
        const { password } = savedUser.get();
        const isPasswordValid = await bcrypt.compare(
          testUser.password,
          password
        );
        expect(isPasswordValid).toBe(true);
        done();
      });
    });
  });
});
