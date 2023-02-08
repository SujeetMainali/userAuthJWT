const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, resp, next) => {
    const token = req.cookies.jwt;

    //check for json web token exists and is verified
    if (token) {
        jwt.verify(token, "hello im sujeet", (err, decodedToken) => {
            if (err) {
                console.log(err);
                resp.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        resp.redirect('/login')
    }
}

const checkUser = (req, resp, next)=>{
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "hello im sujeet", async (err, decodedToken) => {
            if (err) {
                resp.locals.user = null;
                next();
            } else {
               let user = await User.findById(decodedToken.id);
               resp.locals.user = user;
               next();
            }
        });
    } else {
        resp.locals.user = null;
        next();
    }
}

module.exports = {requireAuth, checkUser};

