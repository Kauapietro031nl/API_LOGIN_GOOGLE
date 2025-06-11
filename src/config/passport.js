const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/db');


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {

    const [existingUsers] = await pool.query(
      'SELECT * FROM clientes WHERE google_id = ? OR email = ?',
      [profile.id, profile.emails[0].value]
    );
    
    if (existingUsers.length > 0) {
  
      if (!existingUsers[0].google_id) {
        await pool.query(
          'UPDATE clientes SET google_id = ? WHERE email = ?',
          [profile.id, profile.emails[0].value]
        );
      }
      return done(null, existingUsers[0]);
    }


    const newUser = {
      id: uuidv4(),
      nome: profile.displayName,
      email: profile.emails[0].value,
      google_id: profile.id,
      senha: null
    };

    await pool.query(
      'INSERT INTO clientes (id, nome, email, google_id) VALUES (?, ?, ?, ?)',
      [newUser.id, newUser.nome, newUser.email, newUser.google_id]
    );

    return done(null, newUser);
  } catch (error) {
    return done(error, null);
  }
}));



passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [users] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
    const user = users[0];
    
    if (!user) {
      return done(null, false);
    }
    

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.senha;
    
    done(null, userWithoutPassword);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;