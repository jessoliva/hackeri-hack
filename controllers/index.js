// file connects to server.js

const router = require('express').Router();

const apiRoutes = require('./api');

// adds api to the routes url
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;