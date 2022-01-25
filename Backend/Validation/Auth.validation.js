import { check } from 'express-validator'

export const serverValidation = (res, code, fullErr, msg, location='server') => {
    //init an empty errors obj
    const errors = {}
    errors[location] = {
        fullErr,
        msg,
    }
    
    return res.status(code).json({
        code,
        fullErr,
        errors,
    })
}

//Validation handling for the server
//signup validation
export const signupValidation = [
    check('email')
        .exists()
        .withMessage('Please enter an email address')
        .isEmail()
        .withMessage('The Email is invalid'),
    check('password')
        .exists()
        .withMessage('Please enter a strong password')
        .isLength({min: 8, max:30})
        .withMessage('Password length must be more than 8 char')
]

//Handling login validation
export const loginValidation = [
    check('email')
        .exists()
        .withMessage('Please provide an email to login')
        .isEmail()
        .withMessage('Invalid email. try again'),
    check('password')
        .exists()
        .withMessage('Enter your password')
        .isLength({ min:8 , max:30 })
        .withMessage('Password length must be more than 8 char')
]