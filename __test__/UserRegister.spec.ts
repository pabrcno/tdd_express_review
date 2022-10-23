import request from "supertest";
import app from "../src/app";
import { UsersEndpoints } from "../src/endpoints/users/UsersEndpoints";
import { UsersPostRequest } from "../src/domain/users/UsersRequests";
import { UsersPostMessages } from "../src/constants";

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
});
