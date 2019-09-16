const express = require("express");
const router = express.Router();
const models = require("../models");

const User = models.user;

const _ = require("lodash");

// let users = [];

// const check_sequelize_auth = async () => {
//     try{
//         await sequelize.authenticate();
//         console.log("연결 성공");
//     }catch(err){
//         console.log("연결 실패: ", err);
//     }
// };

// check_sequelize_auth();

// const User = sequelize.define("user", {
//     name : {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     address : {
//         type: Sequelize.STRING,
//         allowNullG: false
//     },
//     password : {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     }
// });

User.sync({ force: true }).then(() => {
    return User.create({
        name: "홍길동",
        address: "seoul",
        password: "112"
    });
}).then(()=> {
    return User.create({
        name: "김철수",
        address: "anyang",
        password: "1224"
    });
});

router.get("/", async(req, res) => {
    let result = await User.findAll({});
    res.send(result);
});

router.get("/:id", async(req, res) => {
    let result = await User.findOne({
        where: {
            id : req.params.id
        }
    });
    res.send(result);
});

router.post("/", async(req, res) => {
   let result = false;
   try{
       await User.create({id: req.body.id, name: req.body.name, address:req.body.address, password:req.body.password});
       result = true;
   }catch(err){
       console.error(err);
   }
   res.send(result);
});

router.put("/:id", async(req, res) => {
    let result = false;
    try{
        await User.update({
            name: req.body.id, address: req.body.address },
            {
            where: {
                id : req.params.id
            }
        });
        result = true;
    }catch(err){
        console.error(err);
    }
    res.send(result);
});

router.delete("/:id", async(req, res) => {
    let result = false;
    try{
        await User.destroy({
            where :{
                id : req.params.id
            }
        });
        result = true;
    }catch(err){
        console.error(err);
    } 
    res.send(result);
});

module.exports = router;