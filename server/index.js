import express from 'express'

import { connectDb } from './connectDb.js'

const PORT = 5000
const server = express()

server.listen(PORT, ()=>{
    connectDb()
    console.log(`Server running on PORT ${PORT}`)
})