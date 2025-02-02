import { Router }  from 'express';
const router = Router();
import multer from 'multer';
import { body } from 'express-validator'

import { getAllProducts, createProduct, getByIdProduct, deleteByIdProduct, editByIdProduct, getByKeywords, getUserProducts } from '../controllers/controller-product.mjs'
import roleAuthorization from '../middleware/role-authorization.mjs';
import { 
    validateCreateProduct, 
    validateEditProduct, 
    validateDeleteProduct, 
    validateGetByIdProduct, 
    validateGetByKeywords,
    validateGetUserProducts 
  } from '../middleware/validate/validate-product.mjs'

import { roleVendor } from '../middleware/role-based/role-based.mjs';

// configure storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/products'); // specify the upload directory
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString()+'.'+file.mimetype.split('/')[1]); // rename the file
    }
});

const fileFilter = (req, file, cb) => {
  const mimetype = file.mimetype
  if (mimetype === "image/jpeg" || mimetype === "image/png" || mimetype === "image/jpg") {
      cb(null, true)
  } else {
      cb(null, false)
  }
     
}
  
const upload = multer({ storage, fileFilter });

router.get('/', getAllProducts) // public

router.get('/user', roleAuthorization, roleVendor, validateGetUserProducts, getUserProducts) // only vendor account

router.post('/', roleAuthorization, roleVendor, upload.array('pictures'), [
            body('product').isLength({ min : 1 }).trim(),
            body('price').isLength({ min : 1 }).trim(),
            body('stock').isLength({ min : 1}).trim(),
            body('desc').isLength({ min : 0 }).trim(),
            body('category').isLength({}).trim()
      ], validateCreateProduct, createProduct) // only vendor account

router.get('/:id', validateGetByIdProduct, getByIdProduct) // public

router.delete('/:id', roleAuthorization, roleVendor, validateDeleteProduct, deleteByIdProduct) // only vendor account

router.patch('/:id', roleAuthorization, roleVendor, upload.array('pictures'), [
            body('product').isLength({ }).trim(),
            body('price').isLength({ }).trim(),
            body('stock').isLength({ }).trim(),
            body('desc').isLength({ }).trim(),
            body('category').isLength({}).trim()
      ], validateEditProduct, editByIdProduct) // only vendor account

router.post('/query', [ body('keywords').isLength({ min : 1 }).trim() ], validateGetByKeywords, getByKeywords) // public

export default router