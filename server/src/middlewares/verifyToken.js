import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({error: 'Unauthorized'})
    
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) return res.status(401).json({error: 'Unauthorized'})

        req.user = decoded
        next()
    })
}