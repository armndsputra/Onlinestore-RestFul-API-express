import { validationResult } from 'express-validator'
import { deleteFileMany } from '../../../utils/deleteFile.mjs'
import Product from '../../models/model-product.mjs'
import validateObjectID from '../../../utils/validateObjectID.mjs'

// create product | vendor
export const validateCreateProduct = async (req, res, next) => {

    try {

        const ID = req.ID

        let filePath = []
        const files = req.files;
        if (files === undefined) {
            return res.status(400).json({ message : 'No files were uploaded' })
        }
        files.map(result => {
            filePath.push(result.path)
        })
        const isPath = filePath.slice(0,5).join(' ')
        if (!isPath) return res.status(400).json({ message : 'No files were uploaded !' })

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            deleteFileMany(filePath)
            return res.status(400).json({ errors: errors.array() });
        }

        const data = {
            vendor : ID,
            product : req.body.product,
            price : req.body.price,
            stock : req.body.stock,
            category : req.body.category,
            desc : req.body.desc,
            path : isPath,
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

// edit/update product | vendor
export const validateEditProduct =  async (req, res, next) => {

    try {

        const id = req.params.id

        const user = await Product.find({_id : id }).exec()
        if (user.length == 0 ) return res.status(404).json({ message: 'Product ID is not available !' })
        if (user[0].vendor.toHexString() !== req.ID) return res.status(400).json({ message: 'Unauthorized access !' })

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const filePaths = []
        const isPath = req.files
        isPath.map(result => {
            filePaths.push(result.path)
        })

        
        const oldPath = await Product.findById({ _id : id }).exec()
        let oldPathNew = oldPath.path.split(' ')
        let combinedPath = [...filePaths, ...oldPathNew];
        const readyPath = combinedPath.slice(0,5).join(' ')
        const readyDrop = combinedPath.slice(5)

        deleteFileMany(readyDrop)

        const data = {
            product : req.body.product ? req.body.product : user[0].product,
            price : req.body.price ? req.body.price : user[0].price,
            stock : req.body.stock ? req.body.stock : user[0].stock,
            category : req.body.category ? req.body.category : user[0].category,
            desc : req.body.desc ? req.body.desc : user[0].desc,
            path : readyPath
        }

        req.id = id
        req.data = data
        next()

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }

}

// delete/remove product | vendor
export const validateDeleteProduct = async (req, res, next) => {

    try {

        const _id = req.params.id

        const user = await Product.find({_id}).exec()
        if (user.length == 0 ) return res.status(404).json({ message: "Product ID isn't available !" })
        if (user[0].vendor.toHexString() !== req.ID) return res.status(400).json({ message: 'Unauthorized access !' })

        const product = await Product.findById(_id).exec()
        if (!product) {
            return res.status(400).json({})
        }
        const filePath = product.path.split(' ')
        if (filePath) {
             deleteFileMany(filePath)
        }

        req.data = _id
        next()

    } catch (err) {
        console.error(err)
        res.status(500).send({ 
            message: 'Error system !' 
        })
    }

}

// get by id product | public
export const validateGetByIdProduct = async (req, res, next) => {

    try {

        const id = req.params.id

        if (!validateObjectID(id)) return res.status(403).json({ message : "Product ID isn't valid !" })

        req.data = id
        next()

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message : 'Error system !'
        })
    }

}

// get by keywords | public
export const validateGetByKeywords = (req, res, next) => {

    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { keywords } = req.body
        req.data = keywords
        next()

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message : 'Error system !'
        })
    }

}

// get user product | vendor
export const validateGetProductsVendor = (req, res, next) => {

    try {

        const ID = req.ID

        req.data = ID
        next()

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message : 'Error system !'
        })
    }

}