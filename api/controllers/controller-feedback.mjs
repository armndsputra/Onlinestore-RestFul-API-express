import Feedback from '../models/model-feedback.mjs'

export const createFeedback = (req, res) => {
    
     const feedback = new Feedback(req.data)
            feedback.save().then(result => {
             res.status(201).json({
                 message : 'succeed',
                 feedback : {
                    id : result._id,
                    productID : result.productID,
                    Vendor : result.vendor,
                    Customer : result.customer,
                    message : result.message,
                    created : result.created
                 }
             })
         }).catch(err => {
             console.error(err)
             res.status(500).json({
                 message : 'Error system !',
             })
         })

}