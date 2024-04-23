import { Router } from "express";

import { create, getAll, getById } from "./controller.js";
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

router.post('/create', verifyToken, create)
router.get('/', getAll)
router.get('/:id', getById)

export default router