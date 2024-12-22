const { uniq } = require("lodash");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// Define the schema for the Person schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


personSchema.pre('save', async function(next) {
    const person = this;
    // hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) {
       return next(); 
    }
    try{
        //hash password generation
        const salt = await bcrypt.genSalt(10);
        // hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        // override the plain password with the hashed password
        person.password = hashedPassword;
        next();

    }
    catch(error){
        return next(error);
    }
});

personSchema.methods.comparePassword = async function(candidatePassword) {
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(error){
        throw error;
    }
}

// create a model based on the schema
const Person = mongoose.model('Person', personSchema);
module.exports = Person;