const sequelize = require("../db");

module.exports = (sequelize, DataTypes) => {
    const Trip = sequelize.define('trip', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        departLoc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        arrivalLoc: {
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
        travelMethod: {
            type: DataTypes.STRING,
            allowNull: true
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
    return Trip;
}