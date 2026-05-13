import { clerkClient, getAuth } from '@clerk/express'
import Course from '../models/Course.js'
import { v2 as cloudinary } from 'cloudinary'
import course from '../models/Course.js'
import { purchase } from '../models/purchase.js'

// update role to educator
export const updateRoleToEducator = async (req, res) => {
    try {
        const { userId } = getAuth(req)
        // console.log(userId)
        // this means go to the  and update or add role to educator
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: 'educator'
            }
        })
        res.json({ success: true, message: 'you can publish course now' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//  a person joins LMS by default is a STudent and after while user can become instructor

// add new course
export const addCourse = async (req, res) => {
    try {
        const { courseData } = req.body
        const imageFile = req.file
        const { userId } = getAuth(req)

        if (!imageFile) {
            return res.json({ success: false, message: 'Thumbnails not Attached' })
        }

        //  1. Upload image first to cloudinary it returns link
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        //  2. Parse and build complete course data
        const parsedCourseData = JSON.parse(courseData)
        parsedCourseData.educator = userId //dding a new field called educator
        parsedCourseData.courseThumbnail = imageUpload.secure_url //  We are adding another field: courseThumbnail

        // 3. Now create — all required fields are present
        await Course.create(parsedCourseData)

        res.json({ success: true, message: 'Course Added' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


//get educator course

export const getEducatorCourse = async (req, res) => {
    try {
        const { userId } = getAuth(req)
        console.log('userid is', userId)
        const courses = await Course.find({ educator: userId })
        // console.log('course is',course)
        res.json({ success: true, courses })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
// get educator Dashboard Data (Total Earning, EnrolledStudents,no.of Course)
// Get educator ID
// Find educator courses
// Find students who bought those courses
// Send enrolled students data

export const educatorDashboardData = async () => {
    try {
        const { userId } = getAuth(req)
        const courses = await Course.find({ educator: userId })
        const TotalCourse = course.length

        const courseIds = courses.map((course) => course._id)

        //calculate total total earning from purchase

        const purchases = await purchase.find({
            courseId: { $in: courseIds },
            // courseIds :“All courses created by THIS educator
            // courseId:The course that a student bought
            // “Find purchases where the purchased course is one of THIS educator’s courses”
            status: 'completed'
        }).populate('userId', 'name imageUrl').populate('courseId', 'courseTittle')

        const EnrolledStudents = purchases.map(purchase => ({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt
        }))
        res.json({ success: true, EnrolledStudents })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}