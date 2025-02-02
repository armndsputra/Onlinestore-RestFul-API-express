import { validationResult } from 'express-validator'
import User from '../../models/model-user.mjs'

// login
export default async (req, res, next) => {

    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body

        const user = await User.findOne({ email }).exec()
        if (!user) {
            return res.status(400).json({ message: 'Email is not exists !' })
        }

        const data = {
            id : user._id.toString(),
            password : user.password,
            tempPassword : password
        }
        req.data = data
        next()

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message : 'Error system !'
        })
    }
}