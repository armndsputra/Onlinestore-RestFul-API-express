import User from '../../models/model-user.mjs'
import validateObjectID from '../../../utils/validateObjectID.mjs'

export const roleVendor = async (req, res, next) => {
    
    try {

        if (req.params.id) {
            if (!validateObjectID(req.params.id)) {
                return res.status(400).json({ message : "Woo, ID didn't pass validation !" })
            }
        }

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

        if (req.params.id) {
            if (!validateObjectID(req.params.id)) {
                return res.status(400).json({ message : "Woo, ID didn't pass validation !" })
            }
        }

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

export const roleAdmin =  async (req, res, next) => {
    
    try {

        if (req.params.id) {
            if (!validateObjectID(req.params.id)) {
                return res.status(400).json({ message : "Woo, ID didn't pass validation !" })
            }
        }

        const { id } = req.user

        const user = await User.findById(id)
        if (user !== null) {
            switch (user.role === process.env.ROLE_ADMIN || user._id === id) {
                case false : {
                    return res.status(403).json({ message : "Forbidden !" })
                } break
                case true : {
                    req.ID = id
                    next()
                } break
                default  : {
                    return
                }
            } return
        } else {
            return res.status(404).json({
                message : 'User is not available !'
            })
        }
        
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message : 'Error system !'
        })
    }

}