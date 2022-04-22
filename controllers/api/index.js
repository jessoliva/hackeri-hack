// file connects to controllers/index.js

const router = require('express').Router();

const userRoutes = require('./user-routes.js');

// add to the routes url --> added after api/
router.use('/users', userRoutes);

module.exports = router;