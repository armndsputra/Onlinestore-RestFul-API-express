import idFilter from '../../../utils/idFilter.mjs';
import User from '../../models/model-user.mjs'

// delete user
export const validateDeleteUser = async (req, res, next) => {

    try {

        const { id } = req.params;

        if (!idFilter(id)) { return res.status(400).json({ message : 'ID is not valid !' })}

        const user = await User.findById(id).exec()
        switch (user) {
            case null : {
                return res.status(404).json({
                    message : 'User is not available !'
                }) 
            } break
            default : {
                if (user.role === process.env.ROLE_ADMIN) {
                    
                    const data = {
                        id : user._id,
                        role : user.role
                    }
                    req.data = data
                    next()
                    return
                }
                const filePath = user.profile_picture
                if (filePath) {
                    const data = {
                        id : user._id,
                        role : user.role
                    }
                    
                    deleteFileOne(filePath)
                    req.data = data
                    next()
                }
            }
        }

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message : 'Error system !'
        })
    }
}

export const validateGetByIdUser = (req, res, next) => {

    const { id } = req.params;
    if (!idFilter(id)) { return res.status(400).json({ message : 'User ID is not available !'})}
    
    req.data = id
    next()
}