import { Router } from "express";
import { UsersEndpoints } from "../../endpoints/users/UsersEndpoints";
import { UsersPostMessages } from "../../constants";
import userService from "../../service/users/UserService";

const router = Router();

router.post(UsersEndpoints.POST, async (req, res) => {
  await userService.save(req.body);
  return res.send({ message: UsersPostMessages.SUCCESS });
});

export default router;
