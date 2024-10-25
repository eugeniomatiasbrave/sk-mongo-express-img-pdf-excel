import { Router } from "express";
import writingControllers from "../controllers/writings.controllers.js";

const router = Router();

router.post('/', writingControllers.createWriting);
router.get('/', writingControllers.getWritings);
router.get('/:wid', writingControllers.getWritingById); 

export default router;