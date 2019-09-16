module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define("Board", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content : {
            type: DataTypes.STRING,
            allowNullG: false
                },
        viewcount : {
            type: DataTypes.INTEGER,
            allowNull: false
                }
    });
    return Board;
}