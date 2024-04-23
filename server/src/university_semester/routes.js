import { Router } from "express";

import { create, getAll, getById, deleteItem } from "./controller.js";
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

router.post('/create/:year_id/:semester', verifyToken, create)
router.get('/all/:year_id', verifyToken, getAll)
router.get('/:id', verifyToken, getById)
router.delete('/:id', verifyToken, deleteItem)

export default router