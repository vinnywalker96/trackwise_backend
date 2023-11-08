const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");    

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let auth_header = req.headers.authorization || req.headers.Authorization;
    if (auth_header && auth_header.startsWith("Bearer")){
        token = auth_header.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err){
                res.status(401).json({message: "User is not authorized"});
            }
            req.user = decoded.user;
            next();
        });
        if (!token){
            res.status(401);
            throw new Error("User is not authorized or missing token");
        }
    }
});

module.exports = validateToken;