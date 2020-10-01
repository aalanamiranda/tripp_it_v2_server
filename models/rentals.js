const sequelize = require("../db");

module.exports = (sequelize, DataTypes) => {
    const Rental = sequelize.define('rental', {
        agency: {
            type: DataTypes.STRING,
            allowNull: false
        },
        item: {
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
            allowNull: true 
        },
        AcitivyId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        description: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })
    return Activity;
}