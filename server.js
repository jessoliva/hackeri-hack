const express = require('express');
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// express-handlebars
const exphbs = require('express-handlebars');
// pass the helpers to the existing exphbs.create() statement 
// const hbs = exphbs.create({ helpers });
const hbs = exphbs.create({});


// express-handlebars engine setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use static files in public folder
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on connection to db and server
// when updating data in the models, force: true, then force:false again
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});