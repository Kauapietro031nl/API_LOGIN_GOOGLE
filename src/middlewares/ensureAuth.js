function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/html/login.html');
}

module.exports = ensureAuth;
