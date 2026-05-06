import course from "../models/Course.js";

//const  get All  Courses
export const getAllCOurses=(req,res)=>{
    try {
        const course=course.find({isPublished:true}).select(['-courseContent','enrolledstudent']).populate=({path:'educator'})
res.json({success:true,course})
       
    } catch (error) {
        
    }
}