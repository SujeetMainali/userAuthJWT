const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true, 'Please enter an email'],
        unique : true,
        lowercase : true,
        validate : [isEmail, "please enter valid email"]
    },
    password : {
        type : String,
        required : [true, 'Please enter password'],
        minlength : [5 , "minimum length for password is 5 characters"]
    }
});


userSchema.post('save', function(doc, next){
    console.log(`new user was created and saved${doc}`);
    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;