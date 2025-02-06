import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { app, server } from './socket/socket.js'
import { connectToDB } from './utils/connectToDB.js'
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv'

dotenv.config()

app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({extended:true}))

const corsOptions = {
    origin:process.env.URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
}

app.use(cors(corsOptions))

app.use('/api/v1/user',userRoutes)



server.listen(5000,()=>{
    connectToDB()
    console.log(`Server is running at port ${5000}`)
})