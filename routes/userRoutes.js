import express from 'express'
import { editUser, getAllUsers, login, logout, register, userProfile } from '../controllers/userController.js'
import isAuthenticated from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/all-users',isAuthenticated,getAllUsers)
router.get('/userProfile',isAuthenticated,userProfile)
router.post('/editProfile',isAuthenticated,editUser)

export default router