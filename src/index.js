const express = require("express");
const app = express();
const user_router = require("./route/users");
const board_router = require("./route/boards");
const models = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", user_router);
app.use("/boards", board_router);

// app.listen(3000);

app.get("/", (req,res) => {
    res.send("hello world");
});

models.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", {raw: true})
.then(() => {
    models.sequelize.sync({force:true}).then(() => {
        app.listen(3000);
    });
});

