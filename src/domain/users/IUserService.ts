import { UsersPostRequest } from "./UsersRequests";

export interface IUserService {
  save: (userReq: UsersPostRequest) => Promise<void>;
}
