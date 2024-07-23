// app.js
const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
require('dotenv').config();

const { Strategy } = require('passport-google-oauth20');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/user'); // Add this line

const PORT = 3000;

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const AUTH_OPTIONS = {
  callbackURL: '/auth/google/callback',
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log('Google profile', profile);
  User.findOne({ googleId: profile.id }).then(existingUser => {
    if (existingUser) {
      done(null, existingUser);
    } else {
      new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        imageUrl: profile.photos[0].value,
        name: profile.displayName,
        score:0,
        roundData:{
            round1:{
                status:true,
                time:0
            },
            round2:{
                status:false,
                time:0
            },
            round3:{
                status:false,
                time:0
            },
            round4:{
                status:false,
                time:0
            },
            round5:{
                status:false,
                time:0
            }
        }
      }).save().then(user => done(null, user));
    }
  });
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

const app = express();

mongoose.connect('mongodb://localhost:27017/yourdb', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(helmet());

app.use(cookieSession({
  name: 'session',
  maxAge: 24 * 60 * 60 * 1000,
  keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.get('/secret', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'You must log in!' });
  }
  return res.send('Your personal secret value is 42!');
});

app.get('/failure', (req, res) => {
  return res.send('Failed to log in!');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
