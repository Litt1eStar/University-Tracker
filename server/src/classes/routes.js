import { Router } from "express";

import { create, getAll, getById, deleteItem, updateScore} from "./controller.js";
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

router.post('/create/:semester_id', verifyToken, create)
router.get('/all/:semester_id', verifyToken, getAll)
router.get('/:id', verifyToken, getById)
router.delete('/:id', verifyToken, deleteItem)
router.put('/update/score/:id', verifyToken, updateScore)

export default router