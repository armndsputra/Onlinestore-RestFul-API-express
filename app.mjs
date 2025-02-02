import  express  from 'express'
const app = express()
import 'dotenv/config'
import morgan from 'morgan'
import pkg from 'body-parser'
const {urlencoded , json} = pkg

// connection database
import './config/db.mjs'

// Import Routes
import routeProduct from './api/routes/route-product.mjs'
import routeOrder from './api/routes/route-order.mjs'
import routeUser from './api/routes/route-user.mjs'
import routeAdmin from './api/routes/route-admin.mjs'
import routeFeedback from './api/routes/route-feedback.mjs'

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, PATCH");
        return res.status(200).json({})
    }
    next()
 })

 app.use(morgan('dev'));
 app.use(urlencoded({ extended: true }));
 app.use(json())

// Routes
app.use('/users', routeUser)
app.use('/products',routeProduct)
app.use('/orders', routeOrder)
app.use('/admin', routeAdmin)
app.use('/feedback', routeFeedback)

app.use((req, res, next) => {
    const error = new Error('The page you are looking for was not found')
    error.status = 404
    next(error)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message : err.message
    })
})

export default app