import User from '../models/model-user.mjs'
import Product from '../models/model-product.mjs'
import Order from '../models/model-order.mjs'
import { deleteFileMany } from '../../utils/deleteFile.mjs'

// get all users
export const getAllUsers = async (req, res) => {
    
    try {

        const data = 'name email phone_number address role gender profile_picture created'

        const users = await User.find().select(data).exec()

        switch (users.length) {
            case 0 : return res.status(404).json({ message : 'Users is not available !' })
            break
            default: {
                return res.status(201).json({
                    message : 'succeed',
                    members : users.length,
                    users : users
                })
            } break
        } return

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message : 'Error system !'
        })
    }

}

export const getByIdUser = async (req, res) => {

    try {

        const id = req.data

        const data = 'name email phone_number address role gender profile_picture created'

        const user = await User.findById(id).select(data).exec()
        if (user !== null) {
            return res.status(200).json({
                message : 'succeed',
                user : user
            })
        } else return res.status(404).json({ message : 'ID is not available !'})

    } catch (err) {
        console.error(err)
        res.status(500).json({ message : 'Error system !'})
    }
}

// delete user
export const deleteByIdUser = async (req, res) => {

    const { id, role } = req.data
    
    try {

        switch(role) {
            case process.env.ROLE_VENDOR : {
                const products = await Product.find({ user : id }).exec()
                
                if (products.length > 0) {
                    let filePath = []
                    products.map(product => {
                        product.path.split(' ').map(result => {
                            filePath.push(result)
                        })
                    })
                    
                    deleteFileMany(filePath)
                    Product.deleteMany({ user : id }).exec().then(result => {
                        console.info(result)
                    }).catch(err => {
                        console.error(err)
                    })
                    // return
                    
                }
                
                const user = await User.deleteOne({ _id : id })
                return res.status(200).json({ message : 'succeed', deleted : user.deletedCount })
                break
            }
            case process.env.ROLE_CUSTOMER : {
                const orders = await Order.find({ user : id }).exec()
                if (orders.length > 0) {
                    Order.deleteMany({ user : id }).exec()
                }
                const user = await User.deleteOne({ _id : id })
                return res.status(200).json({ message : 'succeed', deleted : user.deletedCount })
                break
            }
            case process.env.ROLE_ADMIN : {
                return res.status(403).json({ message : 'Forbidden ..!' })
                break
            }
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message : 'Error system !'})
    }

}
