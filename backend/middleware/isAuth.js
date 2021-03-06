const jwt=require('jsonwebtoken')
const{ACCESS}=require('../config/keys')
const User = require('../models/user');
module.exports=(req,res,next)=>{
    const {authorization}=req.headers
    console.log(authorization);
    if(!authorization){
        return res.status(401).json({error:"you must be logged in"})
    }
    
    const token=authorization.replace("Bearer ","")
    console.log(authorization);
    jwt.verify(token,ACCESS,(err,payload)=>{
        if(err){
            return res.status(401).json(err)
        }

        const {id,email,name,profilepic,about}=payload
        // console.log(id);
        // console.log(email);
        // console.log(email);
        User.findOne({
            where:{
                id:id
            }
        })
        .then(userdata=>{
            //console.log(userdata);
            req.user=userdata;
            next();
        })
        
    })
    
}