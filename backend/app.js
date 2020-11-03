const express=require('express');
const keys=require('./config/keys');
const sequelize=require('./utils/database');
const bodyParser=require('body-parser');
const PORT=process.env.PORT || 5000;
const authRoutes = require("./routes/auth");
const videoRoutes=require('./routes/video');
const verificationToken=require('./models/verificationToken');
const forgotPassword=require('./models/forgotpassword')
//import models
const user=require('./models/user');
const video=require('./models/video');
const like=require('./models/like');
const comment=require('./models/comment')
const app=express();

// Express middleware that allows POSTing data
app.use(express.json());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//To remove CROS (cross-resource-origin-platform) problem
app.use((req, res, next) =>{   
    res.setHeader('Access-Control-Allow-Origin',"*"); // to allow all client we use *
    res.setHeader('Access-Control-Allow-Methods',"OPTIONS,GET,POST,PUT,PATCH,DELETE"); //these are the allowed methods 
    res.setHeader('Access-Control-Allow-Headers', "*"); // allowed headers (Auth for extra data related to authoriaztiom)
    next();
});


app.use(express.static("uploads"))

//routes
app.use(authRoutes);
app.use(videoRoutes);

//associations

user.hasOne(verificationToken);
verificationToken.belongsTo(user,{constraints: true,onUpdate:"cascade",onDelete:"cascade"});
video.belongsTo(user,{foreignKey: "userId"});
user.hasMany(comment, {foreignKey: "userId"});
comment.belongsTo(user, { foreignKey: "userId" });
video.hasMany(comment, { foreignKey: "videoId"});
user.belongsToMany(video, { through: like, foreignKey: "userId" });
video.belongsToMany(user, { through: like, foreignKey: "videoId" });


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
