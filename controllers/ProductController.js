const Product = require('../models/product');
const User = require('../models/user');
class ProductController {

    static async createProduct(req, res) {
        const { name, brand, category, price, quantity, description } = req.body;
        if (!name) {
            res.status(400).json({message: "Name field is required"});
        }
        if (!brand) {
            res.status(400).json({message: "Brand field is required"});
        }
        if (!category) {
            res.status(400).json({message: "Category field is required"});
        }
        if (!price){
            res.status(400).json({message: "Price field is required"});
        }
        if (!quantity){
            res.status(400).json({message: "Quantity field is required"});
        }
        if (!description){
            res.status(400).json({message: "Description field is required"});
        }
        
        const product = await Product.create({
            user_id: req.user.id,
            name,
            brand,
            category,
            price,
            quantity,
            description,
            created_by: req.user.name + " " + req.user.surname
           
        });
        res.status(201).json({message: "Product created successfully", product});

    }
    //@desc get all products
    //@route GET /products
    //@access Private
    static async getAllProducts(req, res) {
        const products = await Product.find({ user_id: req.user.id});
        res.status(200).json({products});
    }
    
}

module.exports = ProductController;