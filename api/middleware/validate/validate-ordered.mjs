import Order from '../../models/model-order.mjs'

// vendor
export const validateGetAllOrdered = async (req, res, next) => {

    try {

        const ID = req.ID

        req.data = ID
        next()

    } catch (err) {
        console.error(err)
        return res.status(500).json({ message : 'Error system !'})
    }

}