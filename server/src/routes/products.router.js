import { Router } from "express";
import { productsService } from "../managers/index.js";
import multer from "../services/uploader.js";

const router = Router();

router.get("/", productsService.getProducts);

router.post('/', multer , productsService.createProduct);

router.delete('/:pid', productsService.deleteProduct);

router.get('/:pid', productsService.getProductById);

router.put('/:pid', productsService.updateProduct);

export default router;