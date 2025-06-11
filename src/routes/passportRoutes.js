const express = require('express');
const passport = require('passport');
const path = require('path');
const router = express.Router();
const ensureAuth = require('../middlewares/ensureAuth');

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account'
}));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/html/login.html' }),
  (req, res) => {
    res.redirect('/clientes');
  }
);

router.get('/clientes', ensureAuth, (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'views', 'clientes.html'));
});

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/html/login.html');
  });
});

module.exports = router;