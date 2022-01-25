import express from 'express'
import mongoose  from 'mongoose'
import passport from 'passport'
import cors from 'cors'
import dotenv from 'dotenv'

//Import passport strategy
import { passportStrategy } from './Controllers/Passport.js'

//Import Routes
import authRoutes from './Controllers/Auth.controller.js'
import productRoutes from './Controllers/Product.controller.js'
import orderRoutes from './Controllers/Order.controller.js'

//Environment variables config
dotenv.config()

//Initiating the express module
const app = express()


//Middlewares
//Express Middleware
app.use(cors())//Allow the server to receive requests from different domains and origins
app.use(express.json())//Parse any input i.e user inputs
app.use(express.urlencoded({extended: true}))//Parse URL -encoded bodies

//Passport use
passportStrategy(passport)

//API RouteS
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

//MondoDB connection
mongoose
.connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Database connection is successful'))
    .catch(err => console.log(err))

//Server Port configuration
const port = process.env.PORT 
app.listen(port, () => console.log(`Server connection is successful on port ${port}`))
