import mongoose from "mongoose";

const purchaseSchema = await mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }, //this store the id of the course
    userId: {
        type: String,
        ref: 'user',
        required: true
    },
    amount:{type:Number,required:true},
    status:{type:String,enum:['pending','completed','failed'],default:'pending'}
},{timestamps:true})
export const purchase =mongoose.model('purchase',purchaseSchema)