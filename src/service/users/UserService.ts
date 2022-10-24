import { IUserService } from "../../domain/users/IUserService";
import { UsersPostRequest } from "../../domain/users/UsersRequests";
import bcrypt from "bcrypt";
import User from "../../infrastructure/sequelize/User";

class UserService implements IUserService {
  async save(userReq: UsersPostRequest): Promise<void> {
    try {
      const hashed = await bcrypt.hash(userReq.password, 10);
      const user = { ...userReq, password: hashed };

      await User.create(user);
    } catch (err) {
      console.log(err);
    }
  }
}

const userService = new UserService();

export default userService;
