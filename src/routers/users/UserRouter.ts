import { Router } from "express";
import { UsersEndpoints } from "../../endpoints/users/UsersEndpoints";
import bcrypt from "bcrypt";
import User from "../../infrastructure/sequelize/User";
import { UsersPostMessages } from "../../constants";

const router = Router();

router.post(UsersEndpoints.POST, async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await User.create({
    username,
    email,
    password: hashed,
  });

  return res.send({ message: UsersPostMessages.SUCCESS });
});

export default router;
