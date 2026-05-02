import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import { clerkWebhook } from './controllers/webhooks.js'
import educatorRoutes from './route/routes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './config/cloudinary.js'

// initialise express
const app = express()

// connect to database
await connectDB()
await connectCloudinary()

// middleware
app.use(cors())
app.use(clerkMiddleware())


// routes
app.get('/', (req, res) => res.send('API is Working '))

// Raw body MUST come before express.json()
app.post('/clerk', express.raw({ type: 'application/json' }), clerkWebhook)

// express.json() only for these routes
app.use('/api/educator', express.json(), educatorRoutes)

// port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})