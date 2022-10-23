import request from "supertest";
import app, { expressApp } from "./../src/app";

it("returns 200 OK when signup request is valid", () => {
  request();
});
