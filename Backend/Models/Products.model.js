import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ProductsSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 15

    },
    description: {
        type: String,
        minlength: 10,
        maxlength: 250,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    }
    },{
        timestamps: true,
        collection: 'Products'
})

let Products = mongoose.model('Products', ProductsSchema)
export { Products }