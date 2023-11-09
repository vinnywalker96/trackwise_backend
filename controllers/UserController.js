const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
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
        const user = await User.findOne({ email: email }).then(async (user) => {
            if (user){
                return res.status(400).json({message: "User already exists"});
            }
            else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({
                    name: name,
                    surname: surname,
                    email: email,
                    password: hashedPassword
                }); 
                if (newUser) {
                    res.status(201).json({ _id: newUser._id, name: newUser.name, surname: newUser.surname, email: newUser.email});
                }
                newUser.save();
                return res.json({message: "User created successfully"});
            }
        })
        
    }
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
    static getCurrentUser(req, res){
        res.status(200).json(req.user );
    }
   

}
module.exports = UserController;