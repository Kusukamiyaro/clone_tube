import { createError } from "../error.js";
import Video from "../models/Video.js"
import User from '../models/User.js'
export const addVideo = async (req, res, next) => {
    const newvedio = new  Video({ userId: req.user.id , ...req.body})
    try {
        const saveVideo = await newvedio.save();
        res.status(200).json(saveVideo);
    } catch (err) {
        next(err)
    }
}
export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "video not found"))
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json(updatedVideo)
        } else {
            return next(createError(403, "You can update only your video"))
        }
    } catch (err) {
        next(err)
    }
}
export const deletevideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "video not found"))
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndDelete(req.params.id);
            res.status(200).json('Delete successfully')
        } else {
            return next(createError(403, "You can delete only your video"))
        }
    } catch (err) {
        next(err)
    }
}
export const getvideo = async (req, res, next) => {
    try {
const  video = await Video.findById(req.params.id)
 res.status(200).json(video)
    } catch (err) {
        next(err)
    }
}

export const addView = async (req, res, next) => {
    try {
await Video.findByIdAndUpdate(req.params.id,{
    $inc:{views:1}
})
 res.status(200).json('view has been increase')
    } catch (err) {
        next(err)
    }
}
export const random = async (req, res, next) => {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    try {
        console.log(req)
      console.log(videos)
      res.status(200).json(videos);
    } catch (err) {
        console.log(err)
      next(err);
    }
  }
export const trends = async (req, res, next) => {
    try {
const  videos = await Video.find().sort({views:-1});
console.log(videos)
 res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}

export const sub = async (req, res, next) => {
    try {

const  user = await User.findById(req.user.id)
console.log('====================================');
console.log(user);
console.log('====================================');
const suscribedchannels = user.subscribeUsers;

const list = await Promise.all(
    suscribedchannels.map(channelId=>{
        return Video.find({userId:channelId})
     } )
)

 res.status(200).json(list.flat().sort((a,b)=>b.createdAt - a.createdAt))
    } catch (err) {
        next(err)
    }
}

export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(',')
     console.log("tags",tags)
    try {
const  videos = await Video.find({tags:{$in:tags}}).limit(20);
 res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}

export const searchByTitle = async (req, res, next) => {
    const query =req.query.q;
    console.log(query);
    try {
const  videos = await Video.find({videoTitle:{$regex : query,$options:"i"}}).limit(20);
 res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}