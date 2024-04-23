import { Router } from "express";

import { create, getAll, getById, deleteItem } from "./controller.js";
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

router.post('/create/:semester_id', verifyToken, create)
router.get('/all/:semester_id', verifyToken, getAll)
router.get('/:id', verifyToken, getById)
router.delete('/:id', verifyToken, deleteItem)

export default router