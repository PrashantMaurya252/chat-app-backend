import express from 'express'
import { getAllUsers, login, logout, register } from '../controllers/userController.js'
import isAuthenticated from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/all-users',isAuthenticated,getAllUsers)

export default router