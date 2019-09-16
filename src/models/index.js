const fs = require("fs");   //fs == 파일시스템
const path = require("path");
const basename = path.basename(__filename);
const Sequelize = require("sequelize");

const db = {};

// sequlize 연결
const sequelize = new Sequelize("node_example", "root", "1234", {host:"localhost", dialect: "mysql"});

sequelize.authenticate().then(()=> {
    console.log("연결 성공");
}).catch(err => {
    console.log("연결 실패: ", err);
});
// 현재폴더 안에 index.js 제외 나머지 모든 파일들을 읽기위한 코드
fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
}).forEach(file => {
    let model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
    console.log(db);
});

Object.keys(db).forEach(modelName => {
    if(db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;