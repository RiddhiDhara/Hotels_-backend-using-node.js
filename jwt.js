const jwt = require("jsonwebtoken"); // require the jsonwebtoken package


// Middleware function to authenticate the jwt token
const jwtAuthMiddleware = (req, res , next) => {

    // first check if request header has authorization or not 
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).json({error : "Token not found"});
    }



    // Extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error : "Unauthorized"});
    }
    
    try{
        // verify the jwt token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach the user information/object to the request object
        // attach the user information/object to the request object
        // The decoded token is the payload of the jwt token which contains the user information
        // We are attaching the user information to the request object so that it can be used in the subsequent middleware/route handlers.
        req.user = decoded;  // we could also write req.userPayload = decoded
        next();
    }
    catch(error){
        console.error(error);
        res.status(401).json({error : "Invalid token"});
    }
};


// function to generate jwt token
const generateToken = (userData) => {
    // create a jwt token using the user information and the secret key
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn : "5h"}); // expiresIn is the time after which the token will expire
};


module.exports = {jwtAuthMiddleware, generateToken}; // export the jwtAuthMiddleware and generateToken functions