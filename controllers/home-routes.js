const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// HOMEPAGE WITH ALL POSTS
router.get('/', (req, res) => {
    console.log(req.session);

    console.log('======================');

    Post.findAll({ // this is the query
        attributes: [
            'id',
            'content',
            'title',
            'created_at'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                } // include the User model itself so it can attach the username to the comment
            },
            {
                model: User,
                attributes: ['username']
            }
            //  post relationship with comment
            // post relationship with user
            // comment relationship with user 
        ]
    })
    .then(dbPostData => {
        // To serialize the object down to only the properties you need, you can use Sequelize's get() method.
        const posts = dbPostData.map(post => post.get({ plain: true }));

        res.render('homepage', 
            { 
                posts,
                loggedIn: req.session.loggedIn,
                username: req.session.username,
                dashboard: true
                // sends these to the homepage and main page
            }
        );
    })
    .catch(err => res.status(500).json(err));
});

// LOGIN PAGE
router.get('/login', (req, res) => {
    // check for a session and redirect to the homepage if one exists
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// SIGN UP PAGE
router.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

// SINGLE POST PAGE
router.get('/posts/:id', (req, res) => {

    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['id', 'username'],
            }
        ]
    })
    .then(dbPostData => {

        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        // serialize the data
        const post = dbPostData.get({ plain: true });

        // check if the comments were written by the signed in user
        post.comments.forEach(comment => {
            if (comment.user_id == req.session.user_id) {
                comment.can_delete = true;
            }
        });

        // pass data to template
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})


module.exports = router;