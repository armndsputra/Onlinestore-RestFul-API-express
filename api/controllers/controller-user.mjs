import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/model-user.mjs';

// create a new user 
export const createdUser = (req, res) => {
   
    const { name, email, password, phone_number, address, role, gender, profile_picture, created } = req.data
    
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return console.error(err)
            }
            
            User.create({ name, email, password : hash, phone_number, address, role, gender, profile_picture, created }).then(result => {
                
                res.status(201).json({
                    message : 'register success',
                    registered : {
                        id : result.id,
                        name : result.name,
                        email : result.email,
                        role : result.role,
                        gender : result.gender,
                        address : result.address,
                        profile_picture : result.profile_picture,
                        created : result.created,
                    }
                })
            }).catch(err => {
                console.error(err)
                if (err.keyValue && err.keyValue.email) {
                    res.status(400).json({     
                        message: `${err.keyValue.email} Already exists !`       
                    });      
                } else {       
                    res.status(500).json({     
                        message: 'An error occurred while registering the user',   
                        error: err.message   
                    });    
                }
            })
        });
    });
}

// login
export const login = (req, res) => {

    const { id, password, tempPassword } = req.data

    bcrypt.compare(tempPassword, password, function(err, isMatch) {
        if (err) return console.error(err)
            if (isMatch === false) return res.status(401).json({ message : "Password is not correct !" })

        jwt.sign({ 
            id : id,
        }, process.env.JWT_KEY, { expiresIn: "4h" }, function(err, token) {
            if (err) return console.error(err)
                res.status(201).json({
                    message : "login success",
                    token : token
                })
        })

    });
}