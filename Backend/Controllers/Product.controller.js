import { Router } from 'express'
import { Products } from '../Models/Products.model.js'

const productController = Router()

//Create a new Product
productController.post('/new', async(req,res) => {
    const newProduct = new Products(req.body)
    newProduct.save()
            .then(item => res.json(item))
})

//Read Products
productController.get('/', async(req,res) => {
    Products.find()
        .sort({updatedAt: -1})
        .then(products => res.json(products))
})

//Update Product
productController.put('/:id', async(req,res) => {
    Products.findByIdAndUpdate({_id:req.params.id}, req.body)
        .then((product) => res.json(product)

    )
})

//Delete Product
productController.delete('/:id', async(req,res) => {
    Products.findByIdAndDelete({_id:req.params.id})
        .then(product => res.json(product))
        .catch(err => {res.status(400).send(err)})

})

export default productController;