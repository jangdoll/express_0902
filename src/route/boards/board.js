const express = require("express");
const board = express.Router();
const _ = require("lodash");

board.get("/", (req, res) => {
   
    res.send("get1");    
});

board.get("/", (req, res) => {
   
    res.send("get2");
});

board.post("/", (req, res) => {
    
    res.send("create");
});

board.put("/", (req, res) => {
   
    res.send("update");
});

board.delete("/", (req, res) => {

    res.send("delete");
});

module.exports = board;