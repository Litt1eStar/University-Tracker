import express from 'express'

import userRoute from './src/user/routes.js'
import universityYearRoute from './src/university_year/routes.js'
import semesterRoutes from './src/university_semester/routes.js'
import { connectDb } from './connectDb.js'

const PORT = 5000
const app = express()

app.use(express.json())
app.use('/api/user', userRoute)
app.use('/api/university_year', universityYearRoute)
app.use('/api/semester', semesterRoutes)

app.listen(PORT, ()=>{
    connectDb()
    console.log(`Server running on PORT ${PORT}`)
})