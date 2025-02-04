import Product from '../models/model-product.mjs';
import Feedback from '../models/model-feedback.mjs';

// get all product
export const getAllProducts = async (req, res) => {
    
    try {
        
        const products = await Product.find()
        .select('product price stock desc created _id path category')
        .populate('user','name address phone_number')
        .exec();
        res.status(200).json({
            message : 'succeed',
            count : products.length,
            products : products.map(product => {
                return {
                    id : product._id,
                    user : product.user,
                    product : product.product,
                    price : product.price,
                    stock : product.stock,
                    category : product.category,
                    desc : product.desc,
                    path : product.path,
                    created : product.created,
                    
                }
            })
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }
}

// create product
export const createProduct = (req, res) => {

    const product = new Product(req.data)
    product.save().then(result => {
        res.status(201).json({
            message : 'succeed',
            product : {
                id : result._id,
                user : result.user,
                product : result.product,
                price : result.price,
                stock : result.stock,
                category : result.category,
                desc : result.desc,
                path : result.path,
                created: result.created,
            }
        })
    }).catch(err => {
        console.error(err)
        res.status(500).json({
            message : 'Error system !',
        })
    })
}

// get by id product
export const getByIdProduct = async (req, res) => {
    
    try {

        const id = req.data

        const product = await Product.findById(id)
        .select('_id product price stock created desc path category')
        .populate('user', 'name address phone_number')
        .exec()
        if (product !== null) {
            res.status(201).json({
                message : 'succeed',
                product : product
            })
        } else return res.status(404).json({
            message : 'Product is not available !'
        })
        
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message : 'Error system !'
        })
    }
}

// delete by id product
export const deleteByIdProduct = async (req, res) => {
   
    try {
        
        const id = req.data

        const feedbacks = await Feedback.find({ productID : id}).exec()
        if (feedbacks) {
            await Feedback.deleteMany({ productID : id })
        }

        // return
        const product = await Product.deleteOne({_id : id}).exec()
        
        res.status(201).json({
            message : 'succeed',
            deleted : product.deletedCount,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }
}

// edit by id product
export const editByIdProduct = (req, res) => {
    
    const _id = req.id
    const data = req.data
    
    Product.findByIdAndUpdate(_id, data).select('user product price stock desc path created category')
    .exec()
    .then(result => {
        console.info(result)
        res.status(201).json({
            message : 'succeed',
            product : result,
        })
    }).catch (err => {
        console.error(err)
        res.status(500).json({
            message : 'Error system !'
        })
    })
}

// get by keyword
export const getByKeywords = async (req, res) => {
  
    try {

        const keywords = req.data

        const result = await Product.find({product : { $regex: keywords, $options: 'i' }})
        .select('product user price stock path desc created category')
        .populate('user', 'name address phone_number')
        .exec()
        res.status(201).json({
            message : 'succeed',
            count : result.length,
            products : result,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message : 'Error system !'
        })
    }
}

// get user products
export const getUserProducts = async (req, res) => {

    try {

        const id = req.data
        
        const products = await Product.find({ user : id }).select('product user price stock category disc path created').exec()
        if (products.length !== 0) {
            return res.status(201).json({
                message : 'succeed',
                count : products.length,
                products : products
            }) 
        } else return res.status(404).json({
            message : 'Products is not available !'
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message : 'Error system !'
        })
    }

}