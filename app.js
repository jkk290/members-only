require('dotenv').config();
const express = require('express');
const path = require('node:path');
const session = require('express-session');
const passport = require('passport');
const appRouter = require('./routes/appRouter');

const app = express();
const PORT = process.env.APP_PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ 
    secret: SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false
}));
app.use(passport.session());
app.use(express.urlencoded({ extended: false}));

app.get('/', appRouter);

app.listen(PORT, () => console.log(`Members app listening on port ${PORT}`));