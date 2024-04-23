import { Router } from "express";

import { create, getAll, getById } from "./controller.js";
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

router.post('/create/:year', verifyToken, create)
router.get('/', verifyToken, getAll)
router.get('/:id', verifyToken, getById)

export default router