import course from "../models/Course.js";

//const  get All  Courses
// This function is used in a backend API to get 
// all published courses from the database and send them to the frontend.
export const getAllCOurses = async (req, res) => {
    try {
        const courses = await course.find({ isPublished: true }).select(['-courseContent', '-enrolledstudent']).populate({ path: 'educator' })
        console.log(courses)
        // So populate replaces the ID with real data.
        res.json({ success: true, courses })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// get course by Id

export const  getCourseId=async(req,res)=>{
    const {id}=req.params
    console.log(id)
try {
    const courseData=await course.findById(id).populate({path: 'educator'})

    // remove lectureUrl if ispreviewfree is false
    courseData.courseContent.forEach(chapter=>{
        chapter.chapterContent.forEach(lecture=>{
if (!lecture.isPreviewFree) {
    lecture.lectureUrl=''
}
        })
    })
    res.json({ success: true, courseData })
} catch (error) {
    res.json({ success: false, message: error.message })
}
}