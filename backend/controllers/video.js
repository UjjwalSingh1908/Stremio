const asyncHandler = require("../middleware/aysncHandler");
const { Op } = require("sequelize");
const User = require('../models/user');
const Video=require('../models/video');
const View=require('../models/view');
const Like=require('../models/like');
const Comment=require('../models/comment');
const Reply=require('../models/replies');
const watchlater = require('../models/watchLater');
const Subscribe=require('../models/subscribe');

exports.uploadvideo = asyncHandler(async (req, res, next) => {

  const { title, description ,category} = req.body;
  console.log(req.files);
  const video = req.files.video[0];
  const image = req.files.image[0];

  console.log(title);
  console.log(video);
  console.log(image);

  if (!title || !video || !image) {
    return res.status(422).json({ error: "please fill all the required fields" });
  }

  const videourl = (video.path).split('\\')[1];
  const thumbnail = (image.path).split('\\')[1];
  console.log(videourl);
  console.log(thumbnail);
  const videodata = await Video.create({
    title: title,
    description: description,
    videourl: videourl,
    userId: req.user.id,
    videoThumbnail:thumbnail,
    category:category
  });
  console.log(videodata);
  res.status(200).json({ success: true, data: videodata });
});

exports.home = asyncHandler(async (req,res,next)=>{
  const videos = await Video.findAll({
    attributes: [
      "id",
      "title",
      "description",
      "videourl",
      "videoThumbnail",
      "userId",
      "createdAt",
      "viewsCount"
    ],
    include: [{ model: User, attributes: ["id", "profilepic", "name","channelName"] }],
    order: [["createdAt", "DESC"]],
  });
  return res.status(200).json({ success: true, data: videos });
    
});

exports.getvideo = asyncHandler(async (req,res,next)=>{
  const video = await Video.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ["id", "name", "profilepic","channelName","subscriberCount"],
      },
    ],
  });
  const recommended = await Video.findAll({
    attributes: [
      "id",
      "title",
      "description",
      "videourl",
      "videoThumbnail",
      "userId",
      "createdAt",
      "viewsCount"
    ],
    include: [{ model: User, attributes: ["id", "profilepic", "name","channelName"] }],
    order: [["createdAt", "DESC"]],
  });

  if (!video) {
    return res.status(404).json({ message:"no video data available for id ${req.params.id}" });
  }

  const comments = await video.getComments({
    order: [["createdAt", "DESC"]],
    attributes: ["id", "text", "createdAt"],
    include: [
      {
        model: User,
        attributes: ["id", "name", "profilepic","channelName"],
      },
    ],
  });

  const isLiked = await Like.findOne({
    where: {
      [Op.and]: [
        { videoId: req.params.id },
        { userId: req.user.id },
        { like: 1 },
      ],
    },
  });

  const addedtowatchlater = await watchlater.findOne({
    where: {
      [Op.and]: [
        { videoId: req.params.id },
        { userId: req.user.id }
      ],
    },
  });

  const isDisliked = await Like.findOne({
    where: {
      [Op.and]: [
        { videoId: req.params.id },
        { userId: req.user.id },
        { like: -1 },
      ],
    },
  });

  const isViewed = await View.findOne({
    where: {
      userId: req.user.id,
      videoId: video.id,
    },
  });

  const isSubscribed = await Subscribe.findOne({
    where: {
      subscriber: req.user.id,
      subscribeTo: video.userId,
    },
  });
  const isVideoMine = (req.user.id).toString() === (video.userId).toString();

  video.setDataValue("comments", comments);
  video.setDataValue("isLiked", !!isLiked);
  video.setDataValue("isDisliked", !!isDisliked);
  video.setDataValue("isVideoMine", isVideoMine);
  video.setDataValue("isSubscribed", !!isSubscribed);
  video.setDataValue("isViewed", !!isViewed);
  video.setDataValue("addedtowatchlater",!!addedtowatchlater);
  video.setDataValue("recommended",recommended);

  res.status(200).json({ success: true, data: video });
  
});

exports.likeVideo = asyncHandler(async (req, res, next) => {
  const video = await Video.findByPk(req.params.id);
  if (!video) {
    return res.status(404).json({ message:"no video data available for id ${req.params.id}" });
  }

  const liked = await Like.findOne({
    where: {
      userId: req.user.id,
      videoId: req.params.id,
      like: 1,
    },
  });

  const disliked = await Like.findOne({
    where: {
      userId: req.user.id,
      videoId: req.params.id,
      like: -1,
    },
  });

  if (liked) 
  {
    video.likesCount-=1;
    video.save();
    await liked.destroy();
  } 
  else if (disliked) 
  {
    video.likesCount+=1;
    video.dislikesCount-=1;
    video.save();
    disliked.like = 1;
    await disliked.save();
  } 
  else 
  {
    video.likesCount+=1;
    video.save();
    await Like.create({
      userId: req.user.id,
      videoId: req.params.id,
      like: 1,
    });
  }

  res.json({ success: true, data: video });
});

exports.dislikeVideo = asyncHandler(async (req, res, next) => {
  const video = await Video.findByPk(req.params.id);

  if (!video) {
    return res.status(404).json({ message:"no video data available for id ${req.params.id}" });
  }

  const liked = await Like.findOne({
    where: {
      userId: req.user.id,
      videoId: req.params.id,
      like: 1,
    },
  });

  const disliked = await Like.findOne({
    where: {
      userId: req.user.id,
      videoId: req.params.id,
      like: -1,
    },
  });

  if (disliked) 
  {
    video.dislikesCount-=1;
    video.save();
    await disliked.destroy();
  } 
  else if (liked) 
  {
    video.likesCount-=1;
    video.dislikesCount+=1;
    video.save();
    liked.like = -1;
    await liked.save();
  } 
  else 
  {
    video.dislikesCount+=1;
    video.save();
    await Like.create({
      userId: req.user.id,
      videoId: req.params.id,
      like: -1,
    });
  }

  res.json({ success: true, data: video });
});

exports.addComment = asyncHandler(async (req, res, next) => {
  const video = await Video.findByPk(req.params.id);

  if (!video) {
    return res.status(404).json({ message:"no video data available for id ${req.params.id}" });
  }

  const comment = await Comment.create({
    text: req.body.text,
    userId: req.user.id,
    videoId: req.params.id,
  });

  const User = {
    id: req.user.id,
    profilepic: req.user.profilepic,
    name: req.user.name,
  };
  video.commentsCount+=1;
  video.save();
  comment.setDataValue("User", User);

  res.status(200).json({ success: true, data: comment });
});

exports.viewVideo = asyncHandler(async (req, res, next) => {
  const video = await Video.findByPk(req.params.id);

  if (!video) {
    return res.status(404).json({ message:"no video data available for id ${req.params.id}" });
  }

  const viewed = await View.findOne({
    where: {
      userId: req.user.id,
      videoId: req.params.id,
    },
  });

  if (viewed) {
    return next(res.status(400).json({ message:"You already viewed this video" }));
  }

  await View.create({
    userId: req.user.id,
    videoId: req.params.id,
  });
  video.viewsCount+=1;
  video.save();
  res.status(200).json({ success: true, data: {} });
});

exports.deleteVideo = asyncHandler (async (req,res,next)=>{

  const video = await Video.findByPk(req.params.id);

  if((video.userId).toString()!= (req.user.id).toString())
  {
    return res.status(404).json({error:"you cant delete other's video"});
  }
  const comment = await Comment.findOne({
    where: {
      videoId:video.id
    }
  });
  if(comment){
  await comment.destroy();
  }
  if(video){
  await video.destroy();}

  return res.status(200).json({message:"deleted"});  

});

exports.editVideo = asyncHandler (async(req,res,next)=>{

  const video = await Video.findByPk(req.params.id);

  if((video.userId).toString()!= (req.user.id).toString())
  {
    return res.status(404).json({error:"you cant edit other's video"});
  }

  console.log(req.body.title);
  await video.update({
    title: req.body.title,
    description: req.body.description
  }, {
    where: {
       id: req.params.id 
      },
  });

  return res.status(200).json({message:video});



});


