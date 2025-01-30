import User from '../../models/model-user.mjs'

export const roleVendor = async (req, res, next) => {
    
    try {

        const { id } = req.user
        
        const user = await User.findById({ _id : id })
        if (user._id.toHexString() === id) {
            if (user.role === process.env.ROLE_VENDOR) {
                req.ID = id
                next()
            } else return res.status(403).json({ message : 'Forbidden !' })
        } else {
            return res.status(401).json({ })
        }
        
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error system !' })
    }
}

export const roleCustomer = async (req, res, next) => {

    try {

        const { id } = req.user
       
        const user = await User.findById({_id : id})
        if (user._id.toHexString() === id) {
            if (user.role === process.env.ROLE_CUSTOMER) {
                req.ID = id
                next()
            } else return res.status(403).json({ message : 'Forbidden !' })
        } else {
            return res.status(401).json({ })
        }
        
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error system !' })
    }
}