const express = require("express");
const app = express();

let users = [];
let user = null;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000);

app.get("/users", (req, res) => {
    if(user) {
        res.send("user " + user.name +" get");
    } else{
        res.send("user id " + req.params.id+" 가 존재하지 않습니다.");    
    }
});

app.get("/users/:id", (req, res) => {
    if(user && user.id == req.params.id) {
        res.send("user " + user.name +" get");
    } else {
        res.send("user id " + req.params.id+" 가 존재하지 않습니다.");
    }

});

app.post("/users", (req, res) => {
    user = req.body;
    console.log(req.body);
    res.send("user 추가 " + user.name);
});

app.put("/users/:id", (req, res) => {
    if(user && user.id == req.params.id) {
        user.name = req.body.name; 
        res.send("user name" + user.name + "으로 변경");
    } else {
        res.send("user id " + req.params.id + "가 존재하지 않습니다.")
    }
});

app.delete("/users/:id", (req, res) => {
    if(user && user.id == req.params.id) {
        user = null;
        res.send("user id " + req.params.id + " 삭제");
    } else {
        res.send("user id " + req.params.id + " 가 존재하지 않습니다.");
    }
});