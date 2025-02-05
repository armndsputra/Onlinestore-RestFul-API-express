import Order from '../models/model-order.mjs';

// vendor
export const getAllOrdered = async (req, res) => {

    try {

        const id = req.data

        const orders = await Order.find({ vendor : id }).select('product customer created quantity').populate('customer','name phone_number address gender').exec()
        if (orders.length > 0) {
            return res.status(200).json({
                message : 'ordered',
                count : orders.length,
                orders : orders
            })
        } else return res.status(404).json({ message : 'orders are not available'})

    } catch (err) {
        console.error(err)
        return res.status(500).json({ message : 'Error system !'})
    }

}