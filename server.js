const express = require('express');
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;
// express-handlebars
const exphbs = require('express-handlebars');
// allows helpers in utils/helps.js to be used in handlebars
const helpers = require('./utils/helpers');
// pass the helpers to the existing exphbs.create() statement 
const hbs = exphbs.create({ helpers });

// sequelize session to create sessions for each user
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'chihuahuas',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};

app.use(session(sess));
//
// This code sets up an Express.js session and connects the session to our Sequelize database.

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

// GIVEN a CMS-style blog site

// DONEEEEEEEE
// WHEN I visit the site for the first time
// THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in

// DONEEEEEEEE
// WHEN I click on the homepage option
// THEN I am taken to the homepage


// WHEN I click on any other links in the navigation
// THEN I am prompted to either sign up or sign in


// DONEEEEEEEE
// WHEN I choose to sign up
// THEN I am prompted to create a username and password

// DONEEEEEEEE
// WHEN I click on the sign-up button
// THEN my user credentials are saved and I am logged into the site


// WHEN I revisit the site at a later time and choose to sign in
// THEN I am prompted to enter my username and password
// have session expire after a certain time?
// session cookie should already be doing this?
// maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week

// DONEEEEEEEE
// WHEN I am signed in to the site
// THEN I see navigation links for the homepage, the dashboard, and the option to log out

// DONEEEEEEEE
// WHEN I click on the homepage option in the navigation
// THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created

// DONEEEEEEEE
// WHEN I click on an existing blog post
// THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment

// DONEEEEEEEE
// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created

// DONEEEEEEEE
// WHEN I click on the dashboard option in the navigation
// THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post

// DONEEEEEEEE
// WHEN I click on the button to add a new blog post
// THEN I am prompted to enter both a title and contents for my blog post

// DONEEEEEEEE
// WHEN I click on the button to create a new blog post
// THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post

// WHEN I click on one of my existing posts in the dashboard
// THEN I am able to delete or update my post and taken back to an updated dashboard

// DONEEEEEEEE
// WHEN I click on the logout option in the navigation
// THEN I am signed out of the site


// WHEN I am idle on the site for more than a set time
// THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
// set interval! call logout function pop up a modal that says you've been logout

// Mock-Up
// The following animation demonstrates the application functionality:

// Animation cycles through signing into the app, clicking on buttons, and updating blog posts.