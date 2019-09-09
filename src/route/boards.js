const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/", (req, res) => {
   
    res.send("get all");    
});

router.get("/:id", (req, res) => {
   
    res.send("get id");
});

router.post("/", (req, res) => {
    
    res.send("create");
});

router.put("/:id", (req, res) => {
   
    res.send("update");
});

router.delete("/:id", (req, res) => {

    res.send("delete");
});

module.exports = router;