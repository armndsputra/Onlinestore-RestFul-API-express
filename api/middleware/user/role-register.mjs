import { validationResult, matchedData, body } from 'express-validator'
import User from '../../models/model-user.mjs';
import { deleteFileOne } from '../../../utils/deleteFile.mjs';

// register
export default async (req, res, next) => {

    try {

        let filePath = []
        if (req.file) {
            filePath = req.file.path
        }
        if (filePath.length < 1) {
            return res.status(400).json({ message : 'File not uploaded !'})
        }
        
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            deleteFileOne(filePath)
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { password } = matchedData(req)
        if (password) {
        const isPassword = await body('password_confirmation')
            .equals(password)
            .withMessage('Passwords do not match !')
            .run(req);

            if (isPassword.errors.length > 0) {
                deleteFileOne(filePath)
                return res.status(400).json({ message : "Passwords do not match !"})
            }
        }
    
        const emailExists = await User.find({ email : req.body.email}).exec()
        if (emailExists.length > 0) {
            deleteFileOne(filePath)
            return res.status(400).json({ message : "Email already exists !"})
        }

        let role = []
        let gender = []
        if (req.body.role == 1) {
            role = process.env.ROLE_CUSTOMER // customer
        } else if (req.body.role == 2) {
            role = process.env.ROLE_VENDOR // seller
        } else {
            deleteFileOne(filePath)
            return res.status(400).json({ message : 'Role select 1 or 2, 1 for customer, 2 for vendor !'})
        }

        if (req.body.gender == 1) {
            gender = process.env.MALE
        } else if (req.body.gender == 2) {
            gender = process.env.FEMALE
        } else {
            deleteFileOne(filePath)
            return res.status(400).json({ message : 'Gender select 1 or 2, 1 for male, 2 for vendor !'})
        }

        
        const data = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            phone_number : req.body.phone_number,
            address : req.body.address,
            role,
            gender,
            profile_picture : filePath,
            created : new Date()
        }
    
        req.data = data
        next()
        
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message : 'Error system !'
        })
    }
}