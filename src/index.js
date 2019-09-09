const express = require("express");
const app = express();
const user_router = require("./route/users");
const boards = require("./route/boards/board");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", user_router);
app.use("/board", boards);

app.listen(3000);

app.get("/", (req,res) => {
    res.send("hello world");
});