require('dotenv').config();
const express = require('express');
const path = require('node:path');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./storages/queries');
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

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try { 
            const user = await db.getUser(username);
            if (!user) {
                return done(null, false, { message: 'Incorrect username'});
            }
            console.log(password, user.password);
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: 'Incorrect password'});
            }
            return done(null, user);
        } catch(error) {
            return done(error);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.getUserById(id);

        done(null, user);
    } catch(error) {
        done(error);
    }
});

app.use('/', appRouter);

app.listen(PORT, () => console.log(`Members app listening on port ${PORT}`));