module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address : {
            type: DataTypes.STRING,
            allowNullG: false
                },
         password : {
            type: DataTypes.INTEGER,
            allowNull: false
                }
    });
    return User;
};

