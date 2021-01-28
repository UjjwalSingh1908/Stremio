//import all required packages here
const express = require("express");
const router = express.Router();
const multer = require("multer");

//middleware for protected routes
const isAuth=require('../middleware/isAuth')

//importing controllers 
const userController = require("../controllers/user");
const checkChannelName=require('../helpers/channelname');

//function to store the images
const storage = multer.diskStorage({
    destination: (req,file, cb)=>{  //choose the destination for storing images
        cb(null,"./uploads/");
    },
    filename: (req,file,cb)=>{      //set filename as originalfilename 
        cb(null, file.originalname)
    }
})

//function to filter the image and vedio type
const fileFilter = (req,file,cb)=>{
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype==="image/jpg" || file.mimetype==="image/gif" ){
        cb(null,true);
    } else{
        cb(null,false)
    }
}
//to handle multiple files of data
const imp = multer({storage:storage ,fileFilter:fileFilter}).single("image")

router.get("/:id/subscribe",[isAuth],userController.subscribe);
router.get("/history",[isAuth],userController.history);
router.get("/getlikedVideo",[isAuth], userController.likedVideos);
router.get("/Trending",userController.Trending);
router.get("/recommendedChannels",[isAuth], userController.recommendedChannels);
router.get("/subscribedchannelFeed",[isAuth],userController.recommendedChannelsVideos);
router.get('/myfeed',[isAuth],userController.myfeed);
router.post('/editprofile',[isAuth,imp],userController.editProfile);
router.get('/:id/profile',[isAuth],userController.myProfile);
router.get("/:id/watchlater",[isAuth],userController.addToWatchLater);
//router.delete("/:id/remove/watchLater",[isAuth],userController.removeFromWatchLater);
router.get("/WatchLaterVideos",[isAuth],userController.getWatchLater);
router.get('/search',[isAuth],userController.searchUser);
router.get('/Trending/Category',userController.categoryWiseVideos);
module.exports = router;