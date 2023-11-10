const router = require('express').Router();
const UserController = require('../controllers/UserController');
const validateToken =  require('../middleware/validateTokenHandler');
const ProductController = require('../controllers/ProductController');


router.post('/api/register', UserController.register);
router.post('/api/login', UserController.login);
router.get('/api/logout', UserController.logout);

router.get('api//users/profile', validateToken, UserController.getCurrentUser);

router.post('/api/products', validateToken, ProductController.createProduct);
router.get('/api/products', validateToken, ProductController.getAllProducts);

module.exports = router;
