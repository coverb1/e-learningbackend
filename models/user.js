import express from 'express'
import mongoose from 'mongoose'

const userSchema=new mongoose.Schema(
    {
        _id:{type:String,required:true},
        name:{type:String,required:true},
        email:{type:String,required:true},
        imageUrl:{type:String,required:true},
        enrolledcCourses:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Course'
            }
        ]
    },{timestamps});

    const  user=mongoose.model('user',userSchema)
    export default user