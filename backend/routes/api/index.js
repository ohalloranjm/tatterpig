const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');

// if current user session is valid, set req.user to that user in the database
// if not, set req.user to null
router.use(restoreUser);

module.exports = router;
