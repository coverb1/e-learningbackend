import mongoose from 'mongoose'


// connect to databse

 const connectDB=async()=>{
    mongoose.connection.on('connected',()=>console.log('Database connected'))
    await mongoose.connect(`${process.env.MONGO_URI}lms`)
}
export default connectDB