import University_Year from "./model.js"

export const create = async(req, res) => {
    const { year } = req.params
    const user = req.user
    
    if(!year) throw new Error('Credential Not Complete')
    
    if(!user) return res.status(401).json({error: 'Unauthorized'})
    
    try {
        const existed = await University_Year.findOne({ year, user_id: user.id })
        if(existed) throw new Error('This Year already created')

        const queryItem = await University_Year.create({year, user_id: user.id})
        if(!queryItem) throw new Error('Failed to Create New Item')
        res.status(200).json(queryItem)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getAll = async(req, res) => {
    const user = req.user    
    if(!user) return res.status(401).json({error: 'Unauthorized'})

    try {
        const queryItem = await University_Year.find({ user_id: user.id})
        if(!queryItem) throw new Error('Failed to Query Item')
        res.status(200).json(queryItem)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getById = async(req, res) => {
    const { id } = req.params
    if(!id) throw new Error('Credential Not Complete')

    try {
        const queryItem = await University_Year.findById(id)
        if(!queryItem) throw new Error('Failed to query Item')
        res.status(200).json(queryItem)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}