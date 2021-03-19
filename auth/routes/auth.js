const router = require('express').Router()
const { request } = require('express');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const {registerValidation,loginValidation} = require('../validation');

const Joi = require('joi') 
  
        


router.get('/test',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.send('Ok');
})

// Register 
router.post('/register',async(req,res)=> {

    // Let's validate the data before we have a user
    try{
        //User-defined function to validate the user 
        const {error} = registerValidation(req.body)
        if(error){
            return res.status(400).send(error.details[0].message)
        }
    }
    catch(err){
    
        res.send(err.message);
    
    }

    
    
    //Check if user already exists
    const emailExists = await User.findOne({email:req.body.email})
    
    if(emailExists){
        return res.status(400).send('email already exists')
    }


    // Hash the password
    try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt)
    
    // Add user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password : hashedPassword
    });
    try{
        
        const savedUser = await user.save();
        res.send({user:user._id});
    } 
    catch(err){
        
        res.status(400).send(err);
    }
}
catch(err){
    res.send(err.message);
}
});

// Sign-in
router.post('/login',async(req,res)=> {
            
    try{
            
        const {error} = loginValidation(req.body);
        if(error){
            
            res.status(400).send(error.details[0].message);
        }
        //Check if user already exists
        
        const user = await User.findOne({email:req.body.email})
    
        if(!user){
            return res.status(400).send('Email or password is wrong')}

        // Decrypt the password
        const validPass = await bcrypt.compare(req.body.password,user.password)
        // Check if password is correct
        if(!validPass){
        
            return res.status(400).send('Email or password is wrong')
        }
        
        //  Post webtoken
        const token = jwt.sign({_id:user._id},process.env.TOKEN_HASH)
        res.header('auth-token',token).send(token);
    }
    catch(err){
        res.status(400).send(err.message)
    }


});

module.exports = router;