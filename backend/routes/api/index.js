const router = require('express').Router();
const { formatSequelizeErrors, restoreUser } = require('../../middleware');
const labelsRouter = require('./labels.js');
const sessionRouter = require('./session.js');
const sheetsRouter = require('./sheets.js');
const usersRouter = require('./users.js');

// if current user session is valid, set req.user to that user in the database
// if not, set req.user to null
router.use(restoreUser);

router.use('/labels', labelsRouter);
router.use('/session', sessionRouter);
router.use('/sheets', sheetsRouter);
router.use('/users', usersRouter);
router.use(formatSequelizeErrors);

module.exports = router;
