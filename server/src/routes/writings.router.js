import { Router } from "express";
import writingControllers from "../controllers/writings.controllers.js";

const router = Router();

router.post('/', writingControllers.createWriting);
router.post('/pdf', writingControllers.createPDFId);
router.get('/', writingControllers.getWritings);
router.get('/:wid', writingControllers.getWritingById); 
router.delete('/:wid', writingControllers.deleteWriting);

export default router;