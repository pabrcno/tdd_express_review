require("@babel/register")();
require("@babel/register")({ extensions: [".js", ".ts"] });
const app = require("./src/app");
app.default();
