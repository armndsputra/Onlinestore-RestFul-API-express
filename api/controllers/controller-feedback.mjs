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

export const getAllFeedback = async (req, res) => {

    try {

        const id = req.ID

        const feedbacks = await Feedback.find({ vendor : id}).select('productID customer vendor message created').populate('customer', 'name').exec()
        if (feedbacks.length !== 0) {
            return res.status(200).json({
                message : 'succeed',
                count : feedbacks.length,
                feedbacks : feedbacks
            })
        } else return res.status(404).json({ message : 'Feedbacks is not available !'})

    } catch (err) {
        console.error(err)
        return res.status(500).json({ message : 'Error system !'})
    }

}

export const getFeedbackByProduct = async (req, res) => {

    try {

        const {productID , vendor} = req.data

        const feedbacks = await Feedback.find({ productID, vendor }).select('productID message created').populate('customer', 'name').exec()
        if (feedbacks) {
            return res.status(200).json({
                message : 'succeed',
                count : feedbacks.length,
                feedbacks : feedbacks
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({ message : 'Error system !'})
    }

}