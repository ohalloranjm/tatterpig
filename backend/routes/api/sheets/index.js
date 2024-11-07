const router = require('express').Router();

router.get('/current', require('./get-current-sheets'));
router.put('/:sheetId/labels/:labelId', require('./put-sheetlabel'));
router.delete('/:sheetId/labels/:labelId', require('./delete-sheetlabel'));
router.post('/:sheetId/labels', require('./post-sheetlabel'));
router.put('/:sheetId/labels', require('./reorder-sheetlabels'));
router.get('/:sheetId', require('./get-one-sheet'));
router.put('/:sheetId', require('./put-sheet'));
router.delete('/:sheetId', require('./delete-sheet'));
router.get('/', require('./get-public-sheets'));
router.post('/', require('./post-sheet'));

module.exports = router;
