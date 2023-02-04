const User = require('../models/User')

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

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
        resp.status(201).json(user)
    } catch (err) {
        const errors = handleErrors(err)
        resp.status(400).json({ errors })
    }
}

module.exports.login_post = async (req, resp) => {
    resp.send("user login success");
}