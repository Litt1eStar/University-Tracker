import express from 'express'

import userRoute from './src/user/routes.js'
import universityYearRoute from './src/university_year/routes.js'
import { connectDb } from './connectDb.js'

const PORT = 5000
const server = express()

server.use(express.json())
server.use('/api/user', userRoute)
server.use('/api/university_year', universityYearRoute)
server.listen(PORT, ()=>{
    connectDb()
    console.log(`Server running on PORT ${PORT}`)
})