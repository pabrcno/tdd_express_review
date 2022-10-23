import request from "supertest";
import app from "../src/app";
import { UsersEndpoints } from "../src/endpoints/users/UsersEndpoints";
import { UserPostRequest } from "../src/domain/users/UserRequests";
import { UserPostMessages } from "../src/constants";

describe("User Registration", () => {
  const testUser: UserPostRequest = {
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
        expect(response.body.message).toBe(UserPostMessages.SUCCESS);
        done();
      });
  });
});
