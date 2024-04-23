import express from 'express'

import userRoute from './src/user/routes.js'
import { connectDb } from './connectDb.js'

const PORT = 5000
const server = express()

server.use(express.json())
server.use('/api/user', userRoute)

server.listen(PORT, ()=>{
    connectDb()
    console.log(`Server running on PORT ${PORT}`)
})