const productRouter = require('express').Router();
const {product, getProduct,getProductById,deleteProduct,editProuct} = require('../controllers/productControllers')
const purchaseProduct = require("../controllers/productPurchase")
const upload = require('../middlewares/upload')
const userAuth = require('../middlewares/userMiddleware')
const {cartItems,getCartProducts,deleteCartItem,changeCartQuantity} = require('../controllers/cartControllers')


productRouter.get('/get-product', getProduct)
productRouter.get('/get-product/:id', getProductById)
productRouter.post('/add-product',userAuth,upload.single("image") ,product)
productRouter.post('/purchase',upload.none() ,purchaseProduct)
productRouter.post('/purchase/det' ,purchaseProduct)
productRouter.delete('/delete-product/:id', deleteProduct)
productRouter.put('/edit-product/:id',upload.single('image') ,editProuct)
productRouter.post('/add-to-cart',userAuth, cartItems)
productRouter.get('/get-cart-products',userAuth, getCartProducts)
productRouter.delete('/delete-cart-item/:id',userAuth, deleteCartItem)
productRouter.post('/update/cart/quantity',userAuth, changeCartQuantity)

 
  
module.exports = productRouter