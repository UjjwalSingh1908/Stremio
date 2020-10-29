const User = require('../models/user');

exports.check_duplicate_email =  (req,res,next)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    })
    .then(user=>{

        if(user)
        {
            return res.status(400).send("fail--> email already exist !!");
        }

        next();
    })
    .catch(error=>{
        res.json(error);
    })
};