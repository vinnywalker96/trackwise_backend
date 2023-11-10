const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
    //@desc Register a user
    //@route POST /api/users/register
    //@access public
    static async register(req, res){
        const { name, surname, email, password } = req.body; 
        if (!name) {
            res.status(400).json({message: "Name field is required"});
        }
        if (!surname) {
            res.status(400).json({message: "Surname field is required"});
        }
        if (!email) {
            res.status(400).json({message: "Email field is required"});
        }
        if (!password){
            res.status(400).json({message: "Password field is required"});
        }
        
        const available = await User.findOne({ email: email });
        if (available){
            res.status(400).json({message: "Email already registered"});
        } 
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            surname,
            email,
            password: hashedPassword
        });

        if (user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email,  
            });
        } else {
            res.status(400).json({message: "Invalid user data"});
        }
        res.json({message: "User created successfully"});
    }
    //@desc Login user
    //@route POST /api/users/login
    //@access public
    static async login(req, res){
        const { email, password } = req.body;
        if (!email || !password){
            res.status(400).json({message: "Email and password fields are required"});
        }
        const user = await User.findOne({ email: email });
        if (user && (await bcrypt.compare(password, user.password))){
            const accesToken = jwt.sign({
                user: {
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    id: user._id
                }
            }, process.env.SECRET_KEY, { expiresIn: "24h" });
            res.status(200).json({ accesToken})

        } else {
            res.status(400).json({message: "Invalid Password"});
        }

    }
    static logout(req, res){
        const token = req.headers.authorization;
        const decodeToken = jwt.decode(token, process.env.SECRET_KEY);
        res.clearCookie(decodeToken);
        res.status(200).json({message: "User logged out successfully"});
    }

    static getCurrentUser(req, res){
        res.status(200).json(req.user );
    }
   

}
module.exports = UserController;