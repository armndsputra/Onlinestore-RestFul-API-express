import  express  from 'express'
const router = express()
import multer from 'multer';
import { body } from 'express-validator'
import { createdUser, login } from '../controllers/controller-user.mjs'
import roleRegister from '../middleware/role-register.mjs'
import roleLogin from '../middleware/role-login.mjs'

// configure storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/users'); // specify the upload directory
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
      cb(new Error('invalid file type. only JPEG, PNG, and PDF are allowed !'), false)
  }
     
}

const upload = multer({ storage, fileFilter });

router.post('/register', upload.single('profile_picture'), [
          body('name').isLength({ min : 1 }),
          body('email').isEmail({ min : 1 }),
          body('password').optional().isLength({ min : 5 }),
          body('phone_number').isLength({ min : 11 }),
          body('address').isLength({ min : 1 }),
          body('role').isLength({ max : 1 }),
          body('gender').isLength({ max : 1})

      ], roleRegister, createdUser)

router.post('/login', [
          body('email').isEmail({ min : 1 }),
          body('password').isLength({ min : 5 })
      ], roleLogin, login)

export default router