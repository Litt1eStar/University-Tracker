import { Router } from 'express'

import { create, deleteItem, getAll, getById, updateStatus, updateScore } from './controller.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

router.post('/create/:class_id', verifyToken, create)
router.get('/getAll/:class_id', verifyToken, getAll)
router.get('/:id', verifyToken, getById)
router.delete('/:id', verifyToken, deleteItem)
router.put('/update/status/:id', verifyToken, updateStatus)
router.put('/update/score/:id', verifyToken, updateScore)

export default router