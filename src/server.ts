import mongoose from 'mongoose'
import app from './app'
import { Server } from 'http'
import dotenv from 'dotenv'
dotenv.config()

let server: Server
const PORT = process.env.PORT || 5000

async function main () {
  try {
    // Connect with Mongoose.
    await mongoose.connect(`${process.env.MONGO_URI}`)
    console.log('Connected to MongoDB using Mongoose successfully!')

    server = app.listen(PORT, () => {
      console.log(`Library Management Server is running on port ${PORT}`)
    })
  } 
  catch (err) {
    console.error('Error starting server:', err)
  }
}

main()
