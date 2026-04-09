import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import clerkWebhook from './controllers/webhooks.js'


// initialise express
const app=express()

// connect to database
await connectDB()

// middleware
app.use(cors())
// routes
app.get('/',(req,res)=>res.send('API is Working'))
app.post('/clerk',express.json(),clerkWebhook)
// port
const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})