// log out the current user

module.exports = (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
};
