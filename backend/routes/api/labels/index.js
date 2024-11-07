const router = require('express').Router();

router.get('/current', require('./get-current'));
router.get('/:labelId', require('./get-one'));
router.put('/:labelId', require('./put'));
router.delete('/:labelId', require('./delete'));
router.post('/', require('./post'));

module.exports = router;
