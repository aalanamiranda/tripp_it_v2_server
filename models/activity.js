const sequelize = require("../db");

module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define('activity', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
    return Activity;
}