const express = require("express");
const router = express.Router();
const _ = require("lodash");

let users = [{
    id: 1,
    name: "윤장원"
},{
    id: 2,
    name: "나광진"
    }];


router.get("/", (req, res) => {
    let msg = "유저가 존재하지 않습니다.";
    if(users.length > 0) {
        msg = users.length + "명의 유저가 존재합니다.";
    }
    res.send({msg, result:users});    
});

router.get("/:id", (req, res) => {
    let msg = "id가 " + req.params.id + "인 유저가 존재하지 않습니다.";
    let user = _.find(users, ["id", parseInt(req.params.id)]);

    if(user) {
        msg = "성공적으로 조회하였습니다.";
    } 
    res.send({msg, result: user});
});

router.post("/", (req, res) => {
    const check_user = _.find(users, ["id", req.body.id]);
    let msg = req.body.id + " 아이디를 가진 유저가 이미 존재합니다.";
    let success = false;
    if(!check_user) {
        users.push(req.body);
        msg = req.body.id + " 유저가 추가되었습니다.";
        success = true;
    }
    res.send({msg, success});
});

router.put("/:id", (req, res) => {
    // const check_user = _.find(users, ["id", parseInt(req.params.id)]);
    let user = _.find(users, ["id", parseInt(req.params.id)]);
    let msg = "id가 " + req.params.id + "인 유저가 존재하지 않습니다.";
    let success = false;
    if(user) {
        user.name = req.body.name;
        msg = "id가 " + req.params.id + "인 유저의 이름을 " + user.name + " 으로 이름이 변경되었습니다.";
        success = true;
    }
    res.send({msg, success});
});

router.delete("/:id", (req, res) => {
    let check_user = _.find(users, ["id", parseInt(req.params.id)]);
    let msg = "id가 " + req.params.id + "인 유저가 존재하지 않습니다.";
    let success = false;
    if(check_user) {
        users = _.reject(users, ["id", parseInt(req.params.id)]);
        msg = "id가 " + req.params.id + "인 유저의 정보를 삭제했습니다. ";
        success = true;
    }
    res.send({msg, success});
});

module.exports = router;