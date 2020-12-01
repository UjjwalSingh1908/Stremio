const User = require('../models/user');

exports.uniqueChannelName =  (req,res,next)=>{
    User.findOne({
        where:{
            channelName :req.body.channelName
        }
    })
    .then(user=>{

        if(user)
        {
            return res.status(400).send("OOPS!!! channel name already taken");
        }

        next();
    })
    .catch(error=>{
        res.json(error);
    })
};