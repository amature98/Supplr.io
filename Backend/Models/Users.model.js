import mongoose from "mongoose"
const Schema = mongoose.Schema

const UsersSchema = new Schema({
    name: {
        type: String,
    },
    location:{ 
        type: String
    },
    phoneNumber: {
        type: String,
    },   
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        default: 'User',
        enum: ['User', 'Admin', 'Client']
    },
    orders: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Order'
    }],
    },{
        timestamps: true,
        collection: 'Users'
})

//Compile the schema into a model and export it
let Users = mongoose.model('Users', UsersSchema)
export { Users }