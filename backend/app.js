const express=require('express');
const keys=require('./config/keys');
const sequelize=require('./utils/database');
const bodyParser=require('body-parser');
const PORT=process.env.PORT || 5000;
const authRoutes = require("./routes/auth");
const user=require('./models/user');
const verificationToken=require('./models/verificationToken');
const forgotPassword=require('./models/forgotpassword')
const app=express();

// Express middleware that allows POSTing data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To remove CROS (cross-resource-origin-platform) problem
app.use((req, res, next) =>{   
    res.setHeader('Access-Control-Allow-Origin',"*"); // to allow all client we use *
    res.setHeader('Access-Control-Allow-Methods',"OPTIONS,GET,POST,PUT,PATCH,DELETE"); //these are the allowed methods 
    res.setHeader('Access-Control-Allow-Headers', "*"); // allowed headers (Auth for extra data related to authoriaztiom)
    next();
});

//routes
app.use(authRoutes);

// //middleware for error handling
// //errorHandeling Middleware
// app.use((err,req,res,next) => {
//     console.log(err)
//     console.log("here")
//     res.status(err.statusCode || 500)
//     res.send({
//         error: {
//             status:err.statusCode || 500,
//             message: err
            
//         }
//     })
// })

//associations

user.hasOne(verificationToken);
verificationToken.belongsTo(user,{constraints: true,onUpdate:"cascade",onDelete:"cascade"});
sequelize
    .sync(
      {force:true}
    )
    .then(result => {
        //console.log(result);
        app.listen(PORT);
        console.log("--------server started-----------");
    })
    .catch(err => {
        console.log(err);
    });

// app.listen(PORT);
