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
Rental = sequelize.import('./models/rental')


Trip.belongsTo(User)
User.hasMany(Trip, {as: 'Trips'})

Activity.belongsTo(User)
User.hasMany(Activity, {as: 'Activities'})

Rental.belongsTo(User)
User.hasMany(Rental, { as: 'Rentals'})

Rental.belongsTo(Trip)
Trip.hasMany(Rental, { as: 'Rentals'})

Activity.belongsTo(Trip)
Trip.hasMany(Activity, {as: 'Activities'})

Rental.belongsTo(Activity)
Activity.hasMany(Rental, { as: 'Rentals'})


module.exports = sequelize;