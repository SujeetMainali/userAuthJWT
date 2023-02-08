const User = require('../models/User')
const jwt = require('jsonwebtoken')

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    //incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'This email is not registered';
    }

    //incorrect password
    if(err.message === 'Incorrect password'){
        errors.password = 'Sorry you entered wrong passkey'
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        //   console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(val);
            // console.log(properties);
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

const  maxAge = 3 * 24 * 60 * 60;
const  createToken = (id)=>{

    return jwt.sign({id}, "hello im sujeet", {
        expiresIn : maxAge,
    });
}

module.exports.signup_get = (req, resp) => {
    resp.render('signup');
}

module.exports.login_get = (req, resp) => {
    resp.render('login');
}

module.exports.signup_post = async (req, resp) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        resp.cookie('jwt', token, {
            httpOnly : true,
            maxAge : maxAge * 1000,
        });
        resp.status(201).json({user : user._id})
    } catch (err) {
        const errors = handleErrors(err)
        resp.status(400).json({ errors })
    }
}

module.exports.login_post = async (req, resp) => {
    const  {email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        resp.cookie('jwt', token, {
            httpOnly : true,
            maxAge : maxAge * 1000,
        });
        resp.status(200).json({user : user._id});
    } catch (err) {
        const errors = handleErrors(err);
        resp.status(400).json({errors});
    }
}

module.exports.logout_get = (req, resp)=>{
    resp.cookie('jwt', '', {maxAge: 1});
    resp.redirect('/');
}