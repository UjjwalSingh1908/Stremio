//import all required packages here
const express = require("express");
const router = express.Router();
const multer = require("multer");

//middleware for protected routes
const isAuth=require('../middleware/isAuth')

//importing controllers 
const videoController = require("../controllers/video");

//function to store the videos
const storage = multer.diskStorage({
    destination: (req,file, cb)=>{  //choose the destination for storing videos and images
        if(file.fieldname === "video")
        {
            cb(null,"./videos");
        }
        else if(file.fieldname === "image")
        {
            cb(null,"./images");
        }
        else if(file.fieldname === "story")
        {
            cb(null,"./story");
        }
    },
    filename: (req,file,cb)=>{      //set filename as originalfilename 
        cb(null, file.originalname)
    }
});

//function to filter vedio type && image type
const fileFilter = (req,file,cb)=>{
    if(file.mimetype==="video/mp4"){
        cb(null,true);
    }
    else if(file.mimetype==="image/jpg" || file.mimetype==="image/jpeg" || file.mimetype==="image/png"){
        cb(null,true);
    }
    else if(file.mimetype==="story/jpg" || file.mimetype==="story/png" || file.mimetype === "story/jpeg" || file.mimetype === "story/mp4")
    {
        cb(null,true);
    }
    else{
        cb(null,false)
    }
};
//to handle multiple files of data
const imp = multer({storage:storage ,fileFilter:fileFilter}).fields(
    [
        {
        name:'video',
        //maxCount:1
        },
        {
        name:'image', 
        //maxCount:1
        },
        {
        name :'story'
        }
        
    ]
);

router.post('/uploadvideo',[isAuth,imp],videoController.uploadvideo);
router.post('/uploadstory',[isAuth,imp],videoController.uploadstory);
router.get('/home',videoController.home);
router.get("/:id/video",[isAuth],videoController.getvideo);
router.get("/:id/view",[isAuth],videoController.viewVideo);
router.get("/:id/like",[isAuth],videoController.likeVideo);
router.get("/:id/dislike",[isAuth],videoController.dislikeVideo);
router.post("/:id/comment",[isAuth],videoController.addComment);
router.delete("/:id/delete",[isAuth],videoController.deleteVideo);
router.put("/:id/editVideo",[isAuth,imp],videoController.editVideo);


module.exports = router;