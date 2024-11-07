const router = require('express').Router();

router.post('/', require('./login'));
router.delete('/', require('./logout'));
router.get('/', require('./get'));

module.exports = router;
