import { Router } from "express";

import { signup, signin, getUserInfo } from "./controller.js";
import { verifyToken} from '../middlewares/verifyToken.js'

const router = Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/user-info', verifyToken, getUserInfo)
export default router