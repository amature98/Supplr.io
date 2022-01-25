import { Router } from 'express'
import { genSalt, hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

import { validationResult } from 'express-validator'
import { Users } from '../Models/Users.model.js'
import { signupValidation, loginValidation } from '../Validation/Auth.validation.js'

import dotenv from 'dotenv'
dotenv.config()

const userAuthController = Router()

//Regiter a user
userAuthController.post('/signup', signupValidation, async (req,res) => {
    const errorsOnValidation = validationResult(req)
    if (!errorsOnValidation.isEmpty()) {
        return res.status(400).json({
            code: 400,
            errors:errorsOnValidation.mapped()
        })
    }
    try {
        const { name, email, password, } = req.body
        //Search the user by email address
        Users.findOne({ email })
            .then( user => {
                //If the email provided already exists, respond with err.msg(400)
                if (user) {
                    return res.status(404).json( 'Email is already taken')
                }
                //Create a new user if the user email req doesn't exist
                else{
                    const newUser = new Users({
                        name,
                        email,
                        password
                    })

                    //hash the password before saving the user
                    genSalt(10, (err, salt) => {
                        hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err
                            newUser.password = hash
                            newUser
                                .save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err))
                        })
                    })
                }
            })       
    }
    catch(err) {
        return console.log(err.message)
    }
})

//Login a user
userAuthController.post('/login', loginValidation, async(req,res) => {
    const errorsOnValidation = validationResult(req)
    if(!errorsOnValidation.isEmpty()) {
        return res.status(400).json({
            code: 400,
            errors:errorsOnValidation.mapped()
        })
    }

    const { email, password } = req.body

    //find the user by email address
    Users.findOne({ email })
          .then(user => {
              //If the user doesn't exist by email
              if (!user) {
                return res.status(404).json('Email not found')                    
              }

              //Check if the passwords match
              compare(password, user.password)
              .then(isMatch => {
                  if(isMatch){
                      //create a payload
                      const payload = {
                          id: user.id,
                          email: user.email
                      }
                      jwt.sign(
                          payload,
                          process.env.PASSPORT_SECRET,
                          {
                              expiresIn: 31556926
                          },
                          (err, token) => {
                              res.status(200).json({
                                  success: true,
                                  token: "Bearer" + token
                              })
                          }
                          )
                    }
                    else {
                        return res.status(400).json('Password is incorrect')
                    }
              })
          })
})
//Read all clients
userAuthController.get('/', async(req,res) => {
    Users.find()
        .sort({name: 1})
        .then(users => res.json(users))
})
    
//Read individual users
userAuthController.get('/:id', async(req, res) => {
    Users.findById()
        .populate('orders')
        .then((user) => res.json(user))
})
export default userAuthController;