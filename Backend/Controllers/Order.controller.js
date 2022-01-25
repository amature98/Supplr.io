import { Router } from 'express'
import { Order } from '../Models/Order.model.js'

const orderController = Router()

//Get all orders
orderController.get('/', async(req,res) => {
    try{
        const userId = req.params.id
        Order.find({userId})
            .sort({createdAt: -1})
            .then(orders => res.json(orders))
    }
    catch(error) {
        res.status(500).send('Something is not right. Try again')
    }
})

//Create an order on checkout
orderController.post('/add', async(req,res) => {
    try{
        const user = req.Users._id
        const products = req.body.products

        const order = new Order({
            user,
            products
        })
        order.save()
            .then(order => res.json(order))
    }
    catch (error) {
        res.status(400).json({
            Error: 'Order could not be processed. Try again'
        })
    }
})

export default orderController;