require('dotenv').config()
let express = require('express');
let cors = require('cors')
let app = express ();
let sequelize = require('./db');

app.use(cors());

let trip = require('./controllers/tripController');
let user = require('./controllers/userController');
let activity = require('./controllers/activityController');
let rental = require('./controllers/rentalController');

sequelize.sync();

app.use(require('./middleware/headers'));
app.use(express.json());

//app.use(require('./middleware/validate-session'));

app.use('/user', user);
app.use('/trip', trip);
app.use('/activity', activity);
app.use('/rental', rental);

app.listen(process.env.PORT, function() {
    console.log(`App is listening on port ${process.env.PORT}`);
})