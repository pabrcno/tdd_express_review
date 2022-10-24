import { Router } from "express";
import { UsersEndpoints } from "../../endpoints/users/UsersEndpoints";
import bcrypt from "bcrypt";
import User from "../../infrastructure/sequelize/User";
import { UsersPostMessages } from "../../constants";

const router = Router();

router.post(UsersEndpoints.POST, async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = { ...req.body, password: hashed };

  await User.create(user);

  return res.send({ message: UsersPostMessages.SUCCESS });
});

export default router;
