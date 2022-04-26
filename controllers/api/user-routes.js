// file connects to api/index.js

const router = require('express').Router();
const { User, Post, Comment} = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] } // client doesn't need the users password
    })
    // this is the Promise that captures the response from the database call
    // database call is the findAll and what is returned
    .then(dbUserData => res.json(dbUserData)) //dbUserData is the data retrieved from the findAll() method
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
        // The 500 Internal Server Error is a "server-side" error, meaning the problem is not with your PC or Internet connection but instead is a problem with the web site's server
    });    
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: { // where = object
            id: req.params.id
        },
        include: [
            {
              model: Post,
              attributes: ['id', 'title', 'post_url', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                  model: Post,
                  attributes: ['title']
                }
            }
        ]
    })
    .then(dbUserData => {

        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            // The 404 status code identifies a user error and will need a different request for a successful response
            return;
        }
        
        // else return the user
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
        // comes from the form submitting this data
    })
    .then(dbUserData => {

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
        
            res.json(dbUserData);
        });
        // We want to make sure the session is created before we send the response back, so we're wrapping the variables in a callback. 
        // The req.session.save() method will initiate the creation of the session and then run the callback function once complete.
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// LOGIN USER /api/users/login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username // find user based on username
        }
    })
    .then(dbUserData => {
        // check if user with that username exists
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that username!' });
            return;
        }

        // verify user based on password entered
        // in User.js model
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
      
            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// connected through logout.js!!
// LOGOUT USER /api/users/logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        //  use the destroy() method to clear the session
        req.session.destroy(() => {
            res.status(204).end();
        });
        // The HTTP 204 No Content success status response code indicates that a request has succeeded, but that the client doesn't need to navigate away from its current page
    }
    else {
        res.status(404).end();
    }
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }

        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;