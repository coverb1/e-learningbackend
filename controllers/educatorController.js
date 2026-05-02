import { clerkClient, getAuth } from '@clerk/express'

// update role to educator
export const updateRoleToEducator = async (req, res) => {
    try {
        const { userId } = getAuth(req)
        console.log(userId)
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
        // const { educatorId } = req.auth()
        const {userId}=getAuth(req)

        if (!imageFile) {
            res.json({ success: false, message: 'Thumbnails not Attached' })
        }

        const parsedCourseData = await JSON.parse(courseData)
        parsedCourseData.educator = userId// Add teacher ID to course
        const newCourse = await Course.create(parsedCourseData) //Save course in database
        const imageUpload = await cloudinary.uploader.upload(imageFile.path) //Upload image to Cloudinary
        newCourse.courseThumbnails = imageUpload.secure_url //Upload image to Cloudinary
        await newCourse.save() //Update the course with image URL
        res.json({ success: true, message: 'Course Added' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
