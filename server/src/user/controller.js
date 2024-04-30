import User from "./model.js"
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

const initializeToken = (id, username) => {
    const token = jwt.sign({id, username}, process.env.SECRET_KEY)
    return token
}

export const signup = async(req, res) => {
    const {username, password, confirmPassword} = req.body
    if(!username || !password || !confirmPassword)
        throw new Error('Credential Not Complete')
    
    try {
        const match = password === confirmPassword
        if(!match) return res.status(400).json({error: "Password Not Match"})
        
        const existed = await User.findOne({ username })
        if(existed) throw new Error('Username already taken')

        //hashing Password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const user = await User.create({ username, password: hashedPassword })
        if(!user) throw new Error('Failed to Create New User')
        const token = initializeToken(user._id, user.username)
        res.status(200).json(token)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const signin = async(req, res) => {
    console.log('signin');
    
    const { username, password} = req.body
    if(!username || !password)
        throw new Error('Credential Not Complete')

    try {
        const existed = await User.findOne({username})
        if(!existed) throw new Error('User Not Found')
        
        const match = bcryptjs.compareSync(password, existed.password)
        if(!match) throw new Error('Password not Correct')
        const token = initializeToken(existed._id, existed.username)
        res.status(200).json(token)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getUserInfo = async(req, res) => {
    console.log('e')
    const user_id = req.user.id
    if(!user_id) return res.status(401).json({error: 'Unauthorized'})
    try {
        const user = await User.findById(user_id)
        if(!user) throw new Error('User not Existed')
        res.status(200).json({username: user.username})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}