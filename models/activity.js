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
        TripId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: false
        },
        description: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: false
        }
    })
    return Activity;
}