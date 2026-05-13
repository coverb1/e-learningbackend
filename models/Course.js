import mongoose from "mongoose";


const lectureSchema = new mongoose.Schema({
    lectureId: { type: String, required: true },
    lectureTittle: { type: String, required: true },
    lectureDuration: { type: Number, required: true },
    lectureUrl: { type: String, required: true }
})


const chapterScheema = new mongoose.Schema({
    chapterId: { type: String, required: true },
    chapterOrder: { type: Number, required: true },
    chapterTittle: { type: String, required: true },
    chapterContent: [lectureSchema]
}, { _id: false })

const courseScheema = new mongoose.Schema({
    courseTitle: { type: String, required: true },
    courseDescription: { type: String, required: true },
    courseThumbnail: { type: String, required: true },
    coursePrice: { type: String, required: true },
    isPublished: { type: String, default: true },
    discount: { type: Number, required: true, min: 0, max: 100 },
    courseContent: [chapterScheema],
    courseRatings: [
        { userId: { type: String }, rating: { type: Number, min: 1, max: 5 } }
    ],
    educator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, Ref: 'User' }]
}, { timestamps: true, minimize: false })

const course = mongoose.model('course', courseScheema)
export default course