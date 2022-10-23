import express from "express";
import { UsersPostMessages } from "./constants";
import { UsersEndpoints } from "./endpoints/users/UsersEndpoints";

const app = express();
export const port = 3000;

app.post(UsersEndpoints.POST, (req, res) =>
  res.send({ message: UsersPostMessages.SUCCESS })
);

export default app;
