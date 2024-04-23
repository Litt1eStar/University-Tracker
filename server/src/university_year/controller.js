export const create = (req, res) => {
    const user = req.user
    if(!user) return res.status(401).json({error: 'Unauthorized'})
    
}

export const getAll = (req, res) => {
    
}

export const getById = (req, res) => {
    
}