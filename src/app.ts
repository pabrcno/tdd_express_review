import express from "express";
import UserRouter from "./routers/users/UserRouter";
const app = express();
export const port = 3000;

app.use(express.json());

app.use(UserRouter);

export default app;
