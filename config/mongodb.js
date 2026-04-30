import mongoose from 'mongoose'


// connect to databse

 const connectDB=async()=>{
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not set')
    }

    mongoose.connection.on('connected',()=>console.log('Database connected'))
    mongoose.connection.on('error',(error)=>console.error('MongoDB connection error:', error.message))

    await mongoose.connect(process.env.MONGO_URI,{
        dbName: process.env.MONGO_DB_NAME || 'lms'
    })
}
export default connectDB
