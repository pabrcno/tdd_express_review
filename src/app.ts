import express from "express";
import { UsersPostMessages } from "./constants";
import { UsersEndpoints } from "./endpoints/users/UsersEndpoints";
import User from "./infrastructure/sequelize/User";
const app = express();
export const port = 3000;

app.use(express.json());

app.post(UsersEndpoints.POST, async (req, res) => {
  await User.create(req.body);

  return res.send({ message: UsersPostMessages.SUCCESS });
});

export default app;
