import { body } from "express-validator";

const validateLogin = [
    body('email','Email cannot be empty').exists(),
    body('email','Email cannot be empty').notEmpty(),
    body('email','Email is not valid').isEmail(),
    body('password', 'password cannot be empty').notEmpty(),
    body('password','password cannot be less than 8 characters').isLength({min:6})
]

export default validateLogin;