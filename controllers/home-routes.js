const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
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

        // console.log(posts);

        res.render('homepage', { posts });
  
        // res.render('homepage', {
        //     posts,
        //     loggedIn: req.session.loggedIn
        // });
    })
    .catch(err => res.status(500).json(err));
});

// render login page
router.get('/login', (req, res) => {
    // check for a session and redirect to the homepage if one exists
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }

    res.render('login');
});


module.exports = router;