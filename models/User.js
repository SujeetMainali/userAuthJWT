const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')

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


//use pre method to fire a function before data is saved to database
userSchema.pre('save', async function(next){
    // console.log('user about to be created and saved', this);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

//use pre method to fire a function after data is saved to database
userSchema.post('save', function(doc, next){
    console.log(`new user was created and saved${doc}`);
    next();
});

// static method to login user 
userSchema.statics.login =  async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;