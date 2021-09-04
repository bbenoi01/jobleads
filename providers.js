const env = require('dotenv').config();

module.exports = {
  'local': {
    'provider': 'local',
    'module': 'passport-local',
    'usernameField': 'username',
    'passwordField': 'password',
    'authPath': '/auth/local',
    'successRedirect': '/auth/account',
    'failureRedirect': '/login',
  },
  'google-login': {
    'provider': 'google',
    'module': 'passport-google-oauth',
    'strategy': 'OAuth2Strategy',
    'clientID': process.env.LOCAL_GOOGLE_CLIENT_ID,
    'clientSecret': process.env.LOCAL_GOOGLE_CLIENT_SECRET,
    'callbackURL': process.env.GOOGLE_CALLBACK_URL,
    'authPath': '/auth/google',
    'callbackPath': '/auth/google/callback',
    'successRedirect': '/auth',
    'failureRedirect': '/',
    'scope': ['email', 'profile'],
    'failureFlash': true,
  },
  // 'google-link': {
  //   'provider': 'google',
  //   'module': 'passport-google-oauth',
  //   'strategy': 'OAuth2Strategy',
  //   'clientID': process.env.LOCAL_GOOGLE_CLIENT_ID,
  //   'clientSecret': process.env.LOCAL_GOOGLE_CLIENT_SECRET,
  //   'callbackURL': '/auth/account',
  //   'authPath': '/link/google',
  //   'callbackPath': '/link/google/callback',
  //   'successRedirect': '/auth/account',
  //   'failureRedirect': '/auth',
  //   'scope': ['email', 'profile'],
  //   'link': true,
  // },
  'github-login': {
    'provider': 'github',
    'module': 'passport-github',
    'clientID': process.env.LOCAL_GITHUB_CLIENT_ID,
    'clientSecret': process.env.LOCAL_GITHUB_CLIENT_SECRET,
    'callbackURL': process.env.GITHUB_CALLBACK_URL,
    'authPath': '/auth/github',
    'callbackPath': '/auth/github/callback',
    'successRedirect': '/auth',
    'failureRedirect': '/',
    'scope': ['email', 'profile'],
    'failureFlash': true,
  },
};
