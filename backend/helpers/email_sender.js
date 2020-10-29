const nodemailer = require("nodemailer");
const nodemailersendgrid = require("nodemailer-sendgrid-transport");
const {api_key}=require('../config/keys');

//connect to sendgrid api
const transporter = nodemailer.createTransport(nodemailersendgrid({
    auth:{
        api_key:api_key
    }
}));

exports.sendemail=(email,token,name,host) =>{
    // //console.log(req.body.name);
    transporter.sendMail({
        from: "sachan.himanshu2001@gmail.com",
        to: email,
        subject: 'Account Verification Link',
        text: 'Hello '+ name +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + host + '\/confirmation\/' + email + '\/' + token + '\n\nThank You!\n',

    });
}

exports.send_forgot_password_email=(email,token,name,host) =>{
    // //console.log(req.body.name);
    transporter.sendMail({
        from: "sachan.himanshu2001@gmail.com",
        to: email,
        subject: 'Account Verification Link',
        text: 'Hello '+ name +',\n\n' + 'Please click on the link to change your password: \nhttp:\/\/' + host + '\/changepassword\/' + email + '\/' + token + '\n\nThank You!\n'

    });
}