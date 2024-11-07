const router = require('express').Router();

router.post('/', require('./signup'));
router.delete('/current', require('./delete-account'));

module.exports = router;
