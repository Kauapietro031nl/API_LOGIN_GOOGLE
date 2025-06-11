function googleCallback(req, res) {
  res.redirect('/views/clientes');
}

function dashboard(req, res) {
  if (req.isAuthenticated()) {
    res.send(`Olá, ${req.user.nome}!
      <br> ${req.user.email}`);
  } else {
    res.redirect('/html/login.html');
  }
}

function logout(req, res) {
  req.logout(() => {
    res.redirect('/html/login.html');
  });
}

module.exports = {
  googleCallback,
  dashboard,
  logout
};
