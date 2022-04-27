// file connects to api/index.js

const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');


// NEED TO ADD WITH AUTHORIZATION

// GET all comments /api/posts
router.get('/', (req, res) => {
    Comment.findAll({
        order: [['created_at', 'DESC']],
        include: [
            {
              model: User,
              attributes: ['username']
            }
        ]
    })
    // Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => res.status(500).json(err));
});

// POST a comment /api/comments
router.post('/', withAuth, (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id 
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => res.status(500).json(err));
});

// DELETE a comment /api/comments/:id
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
        res.json(dbCommentData);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;