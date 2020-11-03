//import all required packages here
const express = require("express");
const router = express.Router();
const multer = require("multer")

//middleware for protected routes
const isAuth=require('../middleware/isAuth')

//importing controllers 
const videoController = require("../controllers/video");

//function to store the videos
const storage = multer.diskStorage({
    destination: (req,file, cb)=>{  //choose the destination for storing images
        cb(null,"./uploads/");
    },
    filename: (req,file,cb)=>{      //set filename as originalfilename 
        cb(null, file.originalname)
    }
});

//function to filter vedio type
const fileFilter = (req,file,cb)=>{
    if(file.mimetype==="video/mp4"){
        cb(null,true);
    } else{
        cb(null,false)
    }
};
//to handle multiple files of data
const imp = multer({storage:storage ,fileFilter:fileFilter}).single("video");

router.post('/uploadvideo',[isAuth,imp],videoController.uploadvideo);


module.exports = router;