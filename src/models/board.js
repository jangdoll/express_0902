module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define("board", {
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

    Board.associate = function(models) {
        models.board.belongsTo(models.user);
    };

    return Board;
}