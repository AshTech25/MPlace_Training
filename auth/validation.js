//Validation
const Joi = require('@hapi/joi');

// Register Validation function
const registerValidation = (user) => 
        { 
            const JoiSchema = Joi.object({ 
              
                name: Joi.string() 
                          .min(5) 
                          .max(30) 
                          .required(), 
                            
                email: Joi.string() 
                       .email() 
                       .min(5) 
                       .max(50), 
                       
                password: Joi.string() 
                       .min(5) 
                       .max(50) 
                                
            });
                                 
            return JoiSchema.validate(user) 
        } 


// Login Validation function
const loginValidation = (user) => 
        { 
            const JoiSchema = Joi.object({ 
              
                email: Joi.string().min(6).required().email(),
                password : Joi.string().min(6).required() 
                                
            });
                                 
            return JoiSchema.validate(user) 
        } 




module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
