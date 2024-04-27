import express from 'express'
import cors from 'cors'

import userRoute from './src/user/routes.js'
import universityYearRoute from './src/university_year/routes.js'
import semesterRoutes from './src/university_semester/routes.js'
import classesRoute from './src/classes/routes.js'

import { connectDb } from './connectDb.js'

const PORT = 5000

const corsProdUrl = 'http://localhost:5173'
const corsOptions = {
    origin: corsProdUrl,
    credential: true
}
const app = express()

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/user', userRoute)
app.use('/api/university_year', universityYearRoute)
app.use('/api/semester', semesterRoutes)
app.use('/api/classes', classesRoute)

app.use('/', (req, res) => {
    res.send("Hi from Backend")
})
app.listen(PORT, ()=>{
    connectDb()
    console.log(`Server is running on PORT ${PORT}`)
})