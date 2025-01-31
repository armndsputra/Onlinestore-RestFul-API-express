import User from '../../models/model-user.mjs'

export default async (req, res, next) => {
    
    try {

        const { id } = req.user

        const user = await User.findById(id)
        if (user !== null) {
            switch (user.role === process.env.ROLE_ADMIN || user._id === id) {
                case false : {
                    return res.status(403).json({ message : "Forbidden !" })
                } break
                case true : {
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