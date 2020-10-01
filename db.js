require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, { 
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to tripp_it_v2 database');
    },
    function(err){
        console.log(err);
    }
);

User = sequelize.import('./models/user')
Trip = sequelize.import('./models/trip')
Activity = sequelize.import('./models/activity')

User.hasMany(Trip, {as: 'Trips'})
User.hasMany(Activity, {as: 'Activities'})
//defining admins ability to associate and control other users under the admin umbrella
User.belongsToMany(User, { as: 'Client', through: 'ClientAdmin' })
Trip.hasMany(Activity, {as: 'Activities'})

module.exports = sequelize;