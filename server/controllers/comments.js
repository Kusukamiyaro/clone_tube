import { createError } from "../error.js"
import Comment from "../models/Comment.js"
import Video from "../models/Video.js"
export const  test = (req,res)=>{
    res.json('successfull')

}
export const addComment = async(req,res,next)=>{
    const newCommnet = new Comment({...req.body,userId:req.user.id})
try{
    const savedComment = await newCommnet.save();
    res.status(200).send(newCommnet)
}catch(err){
    next(err)
}
}
export const deleteComment = async(req,rest,next)=>{
    try{
     const comment = await Comment.findById(req.params.id)
     const video = await Video.findById(req.params.id)
     if(req.user.id===comment.userId || req.user.id === video.userId){
       await Comment.findByIdAndDelete(req.params.id)
       res.status(200).json('comment have been deleted')
     }else{
        return  next(createError(403,"you can only delete your comment"))
     }
    }catch(err){
        next(err)
    }
    }
    export const getComment = async(req,rest,next)=>{
        try{
            const comments = await Comment.find({videoId:req.params.videoId})
            req.status(200).json(comments)
        
        }catch(err){
            next(err)
        }
        }