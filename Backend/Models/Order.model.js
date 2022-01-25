import mongoose from 'mongoose'
const Schema = mongoose.Schema

const orderItemSchema = new Schema({
    productName: {
        type: String,
        required: [true, 'Add product name']
    },
    quantity: {
        type: Number,
        required: [true, 'Add product quantity']
    },
    price: {
        type: Number,
        required: [true, 'Add product price'],
    },
    productId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Products",
        required: true
    }
})

const OrderSchema = new Schema({
    orderItems: [orderItemSchema],
    totalBill: {
        type: Number,
        required: [true, 'Add the total bill'],
        default: 0
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
        required: true,
    },
    status:{
        type: String,
        default: 'Not Processsed',
        enum: ['Not Processed', 'Processing', 'Delivered', 'Cancelled']
    },
    deliveredOn: {
        type: Date
    }
    },{
        timestamps: true,
        collection: 'Order'
    })

const Order = mongoose.model('Order', OrderSchema)
export { Order }