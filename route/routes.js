import express from 'express'
import { addCourse, getEducatorCourse, updateRoleToEducator } from '../controllers/educatorController.js'
import upload from '../config/multer.js'
import { protectEducator } from '../middlewares/authMiddleware.js'
import { requireApiAuth } from '../middlewares/requireApiAuth.js' // 
const educatorRoutes = express.Router()

// add educator role
educatorRoutes.post('/update-role', requireApiAuth, updateRoleToEducator)

// add course
educatorRoutes.post('/add-course',requireApiAuth,protectEducator,upload.single('image'),  addCourse)

// get courses
educatorRoutes.get('/course',requireApiAuth,protectEducator, getEducatorCourse)

export default educatorRoutes