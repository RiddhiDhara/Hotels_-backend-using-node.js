// sets up passport with the local authentication strategy , using a person model for user authentication

const passport = require("passport"); // this is used for authentication which is the superset of passport-local
const localStrategy = require("passport-local").Strategy; // passport local strategy means general username and password authentication
const Person = require("./models/person"); // require the person model

// ---------------------------------------------------------------------authentication middleware function

passport.use(new localStrategy( async (USERNAME, PASSWORD, done) => {
    // try to authenticate the user using the following logic
    try{
      // print the credentials received
      // console.log('receieved credentials : ',USERNAME,PASSWORD);
      // find the user with the specified username
      const user = await Person.findOne({username: USERNAME});
      // if user not found then send an error message
      if(!user){
        return done(null, false, {message : "Incorrect username!"})
      };
      // check if the password matches with the one stored in the database
      const isPasswordMatch = await user.comparePassword(PASSWORD);
      // if password matches then return the user object
      if(isPasswordMatch){
        return done(null, user);
      }
      // if password does not match then return an error message
      else{
        return done(null, false, {message : "Incorrect password!"})
      }
    }
    // if any error occurs during the authentication process then return the error
    catch(error){
      return done(error);
    }
  }));

  
  module.exports = passport;  // exporting the passport