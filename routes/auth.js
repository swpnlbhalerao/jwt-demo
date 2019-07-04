
const router = require('express').Router();
const User = require('../model/User')
const { registerValidation,loginValidation } = require('../validation')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

router.post('/register', async (req, res) => {
    console.log(req.body);

    //validate user details
    const { error } = registerValidation(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    //check duplicate email
    const checkEmail= await User.findOne({email:req.body.email});

    if(checkEmail){
        return res.status(400).send('Email already exixt');
    }

      const salt=await bcrypt.genSalt(10);
      const hashPassword=await bcrypt.hash(req.body.password,salt); 


       //create user 
        const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });
    try {
        const savedUser = await newUser.save();
        res.send({user : savedUser._id});
    } catch (err) {
        res.status(400).send(err)
    }

});


router.post('/login', async (req, res) => {
    console.log(req.body);

    const { error } = loginValidation(req.body)

    if (error)
        return res.status(400).send(error.details[0].message);

    //check duplicate email
    const user= await User.findOne({email:req.body.email});

    if(!user){
        return res.status(400).send('Email doestnt exist');
    }

    const validPassword=await bcrypt.compare(req.body.password,user.password)
    if(!validPassword){
        return res.status(400).send('Password doesnt exist');
    }

    const signatureToken= jwt.sign({_id :user._id},process.env.Secret_Token);

    res.header('auth-token',signatureToken).send(signatureToken);

});




module.exports = router;