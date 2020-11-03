const User = require('../models/user');
const Video=require('../models/video');

exports.uploadvideo = (req,res,next)=>{

    const {title,description}=req.body;
    const video=req.file;

    console.log(title);
    console.log(video);

    if(!title || !video)
    {
        return res.status(422).json({error:"please fill all the required fields"});
    }

    const videourl=(video.path).split('\\')[1];
    console.log(videourl);

    const videodata = Video.create({
        title:title,
        description:description,
        videourl:videourl,
        userId: req.user.id,
      });
    
      res.status(200).json({ success: true, data:videodata });
};