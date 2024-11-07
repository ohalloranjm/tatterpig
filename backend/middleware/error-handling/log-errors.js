// log errors
module.exports = {
  name: 'logErrors',

  middle(err, _req, _res, next) {
    console.error(err);
    return next(err);
  },
};
