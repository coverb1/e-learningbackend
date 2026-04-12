import express from 'express'
import { updateRoleToEducator } from '../controllers/educatorController.js'

const educatorRoutes=express.Router()

// add educator role
educatorRoutes.get('/update-role',updateRoleToEducator)