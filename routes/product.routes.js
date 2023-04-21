const express = require('express');
const router = express.Router();
const productController = require('./../controllers/product.controller');
// Obtener todos los productos
router.get("/products", productController.getAllProducts);

// Obtener todos los productos por categoría
// Obtener un producto específico
router.get('/product/:id', productController.getProduct)
// Añadir producto
router.post("/product", productController.addProduct)


// Eliminar producto
router.delete("/product/:id", productController.deleteProduct)
// Modificar producto
router.put('/product/:id', productController.updateProduct)


module.exports = router;