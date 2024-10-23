import { Router } from "express";
import productsControllers from "../controllers/products.controllers.js";
import uploader from "../services/uploader.js";

const router = Router();

router.get("/", productsControllers.getProducts);
router.delete('/:pid', productsControllers.deleteProduct);
router.get('/:pid', productsControllers.getProductById);
router.post('/', uploader.array('image', 3), productsControllers.createProduct);
router.put('/:pid', productsControllers.updatedProduct);

export default router;