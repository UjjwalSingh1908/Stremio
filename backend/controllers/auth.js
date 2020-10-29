//import all required packages here
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken')
const {ACCESS,REFRESH}=require('../config/keys');
const crypto=require('crypto');
//import schema
const User = require('../models/user');
const Token=require('../models/verificationToken')

//email sender api
const email_sender=require('../helpers/email_sender')
//regex
var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
var passwordregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

const refreshtokenlist=[];

exports.signup =  (req,res,next) =>{

    const{name,email,password,confirmPassword}=req.body;
    console.log(req.body);
    //check email validation
    var valid = emailRegex.test(email);
    if(!valid)
    {
        return res.status(422).json({error: "please enter valid email"});
    }
    //check password validation
    valid = passwordregex.test(password);
    if(!valid)
    {
        return res.status(422).json({error: "password must contain atleast one special character one number and length should be between 6 to 16 and spaces are not allowed"});
    }

    //all details should be mentioned
    if(!email || !password || !name || !confirmPassword ) {
        
        return res.status(422).json({error:"please add all the fields"});
    }

    //password should be confirmed
    if(password != confirmPassword) {
        return res.status(422).json({error:"confirm your password"})
    }

    User.create({
        name:name,
        email:email,
        password:bcrypt.hashSync(req.body.password,8)
    })
    .then(user=>{
        const token = new Token({ email: email, token: crypto.randomBytes(16).toString('hex') });
        token.save();
        //console.(token);
        console.log(req.headers.host);
        res.status(200).json({
            message:"hurrah you singed up successfully",
            token:token
        });
        return email_sender.sendemail(email, token.token, name, req.headers.host);
        // res.send(token);
       // res.status(200).json({message:"hurrah you singed up successfully"});
    })
    .catch(error=>{
        res.json(error)
    })

};

exports.confirmEmail = (req,res,next)=>{

    //check in db
    console.log(req.params.token);
    Token.findOne({
        where:{
            token:req.params.token
        }
    })
    .then(token=>{
        if (!token){
            return res.status(400).send({msg:'Your verification link may have expired. Please click on resend for verify your Email.'});
        }

        //means token found
        User.findOne({
            where:{
                email:req.params.email
            }
        })
        .then(user=>{
            // not valid user
            if (!user){
                return res.status(401).send({msg:'We were unable to find a user for this verification. Please SignUp!'});
            } 
            // user is already verified
            else if (user.isverified=="true"){
                // user.isverified = 'false';
                // user.save();
                return res.status(200).send('User has been already verified. Please Login');
            }
            // verify user
            else{
                // change isVerified to true
                user.isverified = "true";
                user.save();
                token.destroy();

                const accesstoken=jwt.sign({id:user.id},ACCESS,{expiresIn:"60s"});
                const refreshtoken=jwt.sign({id:user.id},REFRESH,{expiresIn:"7d"});

                refreshtokenlist.push(refreshtoken);

                const {id,email,name}=user;
                //res.send('Your account has been successfully verified');
                //console.log(accesstoken);
                console.log("<---------hello token generated------------------>");

                return res.status(200).send({
                    message:"Your account has been successfully verified",
                    accesstoken,
                    refreshtoken,
                    user:{
                        id,
                        email,
                        name
                    }
                });
            }
        })
        .catch(err=>{
            res.json(err);
        })
    })
    .catch(err=>{
        res.json(err);
    })

};

exports.resendemail = (req,res,next)=>{

    User.findOne({
        where:{
            email:req.body.email
        }
    })
    .then(user=>{
        if(!user)
        {
            return res.status(400).send({msg:'We were unable to find a user with that email. Make sure your Email is correct!'});
        }
        // user has been already verified
        else if (user.isverified=="true"){
            return res.status(200).send('This account has been already verified. Please log in.');
    
        }
        // send verification link
        else{
            // generate token and save
            //update and create
            const createtoken=crypto.randomBytes(16).toString('hex');
            Token.findOne({
                where:{
                    email:req.body.email
                }
            })
            .then(found=>{
                if(!found)
                {
                    const token = new Token({email: email,token: createtoken });
                    token.save();
                }
                else
                {
                    found.token=createtoken;
                }
                console.log(createtoken);
                return email_sender.sendemail(user.email,createtoken,user.name,req.headers.host);
            })
            .catch(err=>{
                res.json(err);
            })
            // res.send(token.name);
            //console.log(req.headers.host);
            
        }

    })
    .catch(err=>{
        resjson(err);
    })
};

exports.forgotPasswordLink= (req,res,next)=>{

    User.findOne({
        where:{
            email:req.body.email
        }
    })
    .then(user=>{
        if(!user)
        {
            return res.status(400).send({msg:'We were unable to find a user with that email. Make sure your Email is correct!'});
        }
        else
        {
            // generate token and save
            //update and create
            const createtoken=crypto.randomBytes(16).toString('hex');
            Token.findOne({
                where:{
                    email:req.body.email
                }
            })
            .then(found=>{
                if(!found)
                {
                    const token = new Token({email: email,token: createtoken });
                    token.save();
                }
                else
                {
                    found.token=createtoken;
                }
                console.log(createtoken);
                return email_sender.send_forgot_password_email(user.email,createtoken,user.name,req.headers.host);
            })
            .catch(err=>{
                res.json(err);
            })
            // res.send(token.name);
            //console.log(req.headers.host);
            
        }

    })
    .catch(err=>{
        resjson(err);
    })
};

exports.changepassword = (req,res,next)=>{

    //check in db
    const {newPassword,confirmPassword}=req.body;
    console.log(req.params.token);
    Token.findOne({
        where:{
            token:req.params.token
        }
    })
    .then(token=>{
        if (!token){
            return res.status(400).send({msg:'Your change password link may have expired. Please click on forgot password again.'});
        }

        //means token found
        User.findOne({
            where:{
                email:req.params.email
            }
        })
        .then(user=>{
            // not valid user
            if (!user){
                return res.status(401).send({msg:'We were unable to find a user for this verification. Please SignUp!'});
            }
            // verify user
            else{
                // change isVerified to true
                if(!newPassword || !confirmPassword)
                {
                    return res.status(422).json({error:"please fill the require fields"});
                }
                else if(newPassword!=confirmPassword)
                {
                    return res.status(422).json({error:"password do not match"});
                }

                valid = passwordregex.test(newPassword);
                if (!valid) {
                    return res.status(422).json({ error: "password must contain atleast one special character one number and length should be between 6 to 16 and spaces are not allowed" });
                }

                user.isverified = "true";
                user.password=bcrypt.hashSync(req.body.newPassword,8);
                user.save();
                token.destroy();
                return res.status(200).send('Your account has been successfully verified');
            }
        })
        .catch(err=>{
            res.json(err);
        })
    })
    .catch(err=>{
        res.json(err);
    })
};

exports.renewAccessToken = (req,res,next)=>{
    const refreshtoken=req.body.refreshtoken;
    console.log(refreshtokenlist);
    if(!refreshtoken || !refreshtokenlist.includes(refreshtoken))
    {
        return res.status(403).json({message: "user not authenticated"});
    }

    jwt.verify(refreshtoken,REFRESH,(err,payload)=>{
        if(!err)
        {
            refreshtokenlist.remove(refreshtoken);

            const accesstoken = jwt.sign({ id: payload.id }, ACCESS, { expiresIn: 20 });
            const refreshtoken = jwt.sign({ id:payload.id }, REFRESH, { expiresIn: 7 * 24 * 60 * 60 });
            const { id, email, name } = payload;
            refreshtokenlist.push(refreshtoken);
            return res.status(201).json({
                accesstoken: accesstoken,
                refreshtoken: refreshtoken
            })
        }
        else
        {
            return res.status(403).json({
                message:"user not authenticated"
            })
        }
    })
};

exports.check = (req,res,next)=>{
    console.log(req.user.id,req.user.name,req.user.email);
    return res.send('hello');
}

exports.login = (req,res,next)=>{

    const {email,password}=req.body

    if(!email || !password)
    {   
        return res.status(422).json({error:"please fill all the fields"});
    }

    User.findOne({
        where:{
            email:email
        }
    })
    .then(savedUser=>{
        console.log(savedUser)

        if(!savedUser.email)
        {
            return res.status(422).json({message:"please signup first"});
        }
        else if(!savedUser)
        {
            return res.status(422).json({message:"invalid email or password"});
        }
        else if(savedUser.isverified==="false")
        {
            //not verified
            const token = new Token({ email: email, token: crypto.randomBytes(16).toString('hex') });
            token.save();
            //console.(token);
           // console.log(req.headers.host);
            res.status(200).json({
                message: "hurrah you singed up successfully",
                token:token
            });
            return email_sender.sendemail(email, token.token, savedUser.name, req.headers.host);
        }
        else
        {
            bcrypt.compare(password,savedUser.password)
            .then(doMatch=>{

                if(doMatch)
                {
                    const accesstoken = jwt.sign({ id: user.id }, ACCESS, { expiresIn: "60s" });
                    const refreshtoken = jwt.sign({ id: user.id }, REFRESH, { expiresIn: "7d" });

                    refreshtokenlist.push(refreshtoken);

                    const { id, email, name } = user;
                    //res.send('Your account has been successfully verified');
                    //console.log(accesstoken);
                    console.log("<---------hello token generated------------------>");

                    return res.status(200).send({
                        message: "logged in successfully",
                        accesstoken,
                        refreshtoken,
                        user: {
                            id,
                            email,
                            name
                        }
                    });
                }
                else
                {
                    return res.status(422).json({error:"wrong password"})
                }

            })
            .catch(err=>{
                res.json(err);
            })
        }
    })
    .catch(err=>{
        res.json(err);
    })

};
