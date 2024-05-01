import express from 'express'
import cors from 'cors'
import path from 'path'

import userRoute from './src/user/routes.js'
import universityYearRoute from './src/university_year/routes.js'
import semesterRoutes from './src/university_semester/routes.js'
import classesRoute from './src/classes/routes.js'
import assignmentRoute from './src/assignment/routes.js'

import { connectDb } from './connectDb.js'

const PORT = 5000
const prodOrigins = [process.env.PROD_ORIGIN_1, process.env.PROD_ORIGIN_2]
const devOrigin = 'http://localhost:5173'
const origin = process.env.NODE_ENV === "production" ? prodOrigins : devOrigin
const corsOptions = {
    origin: origin,
    credential: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}
const app = express()

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/user', userRoute)
app.use('/api/university_year', universityYearRoute)
app.use('/api/semester', semesterRoutes)
app.use('/api/classes', classesRoute)
app.use('/api/assignment', assignmentRoute)

app.listen(PORT, ()=>{
    connectDb()
    console.log(`Server on PORT ${PORT}`)
})