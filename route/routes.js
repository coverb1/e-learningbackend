import express from 'express'
import { addCourse, updateRoleToEducator } from '../controllers/educatorController.js'
import { getAuth } from '@clerk/express'
import upload from '../config/multer.js'
import { protectEducator } from '../middlewares/authMiddleware.js'


const educatorRoutes=express.Router()

const requireApiAuth = (req, res, next) => {
  const { userId } = getAuth(req)

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Please send a valid Clerk Bearer token.'
    })
  }

  next()
}

// add educator role
educatorRoutes.post('/update-role', requireApiAuth, updateRoleToEducator)
educatorRoutes.post('/add-course',upload.single('image'),protectEducator,addCourse)

export default educatorRoutes
