const router = require('express').Router();
const UserController = require('../controllers/UserController');
const validateToken =  require('../middleware/validateTokenHandler');

router.get('/', (req, res) => {
    res.send('Hello world');
}
);  

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/users/profile', validateToken, UserController.getCurrentUser);
// router.put('/users/:id', UserController.updateUser);

// router.get('/users', UserController.getAll);
// router.get('/users/:id', UserController.getById);

// router.delete('/users/:id', UserController.delete);

// router.post('/users/:id/products', UController.createProduct);
// router.get('/users/:id/products', UserController.getProducts);
// router.get('/users/:id/products/:product_id', UserController.getProductById);
// router.put('/users/:id/products/:product_id', UserController.updateProduct);

module.exports = router;
