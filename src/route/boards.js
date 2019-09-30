const express = require("express");
const router = express.Router();
const _ = require("lodash");
const models = require("../models");

const Board = models.board;

// let board = [];
// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("node_example", "root", "1234", {host:"localhost", dialect: "mysql"});

// const check_sequelize_auth = async () => {
//     try{
//         await sequelize.authenticate();
//         console.log("연결 성공");
//     }catch(err){
//         console.log("연결 실패: ", err);
//     }
// };

// check_sequelize_auth();

// const Board = sequelize.define("Board", {
//     title : {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     content : {
//         type: Sequelize.STRING,
//         allowNullG: false
//     },
//     viewcount : {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     }
// });

// Board.sync({ force: true }).then(() => {
//     return Board.create({
//         title: "asc",
//         content: "뭘까",
//         viewcount: "808"
//     });
// }).then(()=> {
//     return Board.create({
//         title: "몰라유",
//         content: "왜요",
//         viewcount: "206222"
//     });
// })

router.get("/", async(req, res) => {
    let result = await Board.findAll({});
    res.send(result);    
});

router.get("/:id", async(req, res) => {
    let result = await Board.findOne({
        where: {
            id : req.params.id
        }
    });
    res.send(result);
});

router.post("/", async(req, res) => {
    let result = false;
    try{
        await Board.create({id: req.body.id, title: req.body.title, content:req.body.content, viewcount:req.body.viewcount});
        result = true;
    }catch(err){
        console.error(err);
    }
    res.send(result);
});

router.put("/:id", async(req, res) => {
    let result = false;
    try{
        result = await Board.update({title: req.body.title, content: req.body.content, viewcount: req.body.viewcount}, {
            where: {
                id : req.params.id
            }
        }).then(result => {
            return Boolean(result[0]);
        });
    }catch(err){
        console.error(err);
    }
    res.send(result);
});

router.delete("/:id", async(req, res) => {
    let result = false;
    try{
        result = await Board.destroy({
            where:{
                id : req.params.id
            }
        }).then(result => {
            return Boolean(result);
        });
    }catch(err){
        console.error(err);
    }
    res.send(result);
});

module.exports = router;