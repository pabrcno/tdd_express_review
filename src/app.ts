import express from "express";

const app = async () => {
  const init: string = "Hello World!";
  const application = express();
  application.listen(3000, () => console.log(init));
};

export default app;
