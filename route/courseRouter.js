import express from "express";
import { getAllCOurses, getCourseId } from "../controllers/courseController.js";

const courseRouter=express.Router()

courseRouter.get('/all',getAllCOurses)
courseRouter.get(':id',getCourseId)

export default courseRouter