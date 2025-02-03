import Product from '../../models/model-product.mjs'
import Feedback from '../../models/model-feedback.mjs'

// only for customer
export const validateCreateFeedback = async (req, res, next) => {

    try {

        const id = req.ID
        const { productID, message } = req.body

        const feedback = await Feedback.findOne({ productID : productID, customer : id })
     
        if (feedback) return res.status(400).json({ message : 'You have already given feedback !'})
            
    
        const product = await Product.findById(productID).exec()
        if (product !== null) {
            const data = {
                productID,
                customer : id,
                message,
                vendor : product.user,
                created : new Date()
            }

            req.data = data
            next()
        } else return res.status(404).json({ message : 'Product is not available !'})
        
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error system !' })
    }

}

export const validateGetAllFeedback = async (req, res, next) => {

    try {

        next()

    } catch (err) {
        console.error(err)
        return res.status(500).json({ message : 'Error system !'})
    }

}

export const validateGetFeedbackByProduct = async (req, res, next) => {

    try {

        const productID = req.params.id
        const id = req.ID
        
        const feedback = await Feedback.findOne({ productID : productID, vendor : id })
        if (feedback !== null) {
            const data = {
                productID,
                vendor : id,
            }

            req.data = data
            next()
        } else return res.status(404).json({ message : 'Product ID is not available !'})

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message : 'Error system !'
        })
    }

}