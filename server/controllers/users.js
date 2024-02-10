import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js";

//update
export const update =async (req,res,next)=>{
    if(req.params.id === req.user.id){
        //update
        try{
        const  updateUser= await User.findByIdAndUpdate(req.params.id,{
            $set : req.body
        } ,{
            new:true
        } );
        res.status(200).json(updateUser)
        }catch(err){
            console.log(err)
            next(err)
        }
    }else{
        return next(createError(403,"only authorized to update signed in account"))
    }

}
export const deleteUser = async(req,res,next)=>{
    if(req.params.id === req.user.id){
        //update
        try{
        const  deleteUser= await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted')
        }catch(err){
            console.log(err)
            next(err)
        }
    }else{
        return next(createError(403,"only authorized to delete signed in account"))
    }
}
export const  getUser =async (req,res,next)=>{
    try{
const user =await User.findById(req.params.id)
 res.status(200).json(user)
    }catch(err){
       next(err) 
    }
}
export const  subscribe =async (req,res,next)=>{
    try{
   await User.findByIdAndUpdate(req.user.id,{
    $push :{subscribeUsers: req.params.id}
   })
   await User.findByIdAndUpdate(req.params.id,{
    $inc:{
        subsriber :1,
    }
   })
   res.status(200).json("Subscribed successfully")
    }catch(err){
       next(err) 
    }
}
export const  unSubscribe =async (req,res,next)=>{
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $pull :{subscribeUsers: req.params.id}
           })
           await User.findByIdAndUpdate(req.params.id,{
            $inc:{
                subsriber : -1,
            }
           })
           res.status(200).json("Unubscribed successfully")
          
    }catch(err){
       next(err) 
    }
}
export const  like =async (req,res,next)=>{
    const id = req.user.id;
    const videoId = req.params.videoId
    try{
await Video.findByIdAndUpdate(videoId,{
    $addToSet :{likes:id},
    $pull: {dislikes:id}
})
 res.status(200).json("the video have been liked")
    }catch(err){
       next(err) 
    }
}
export const  dislike =async (req,res,next)=>{
    const id = req.user.id;
    const videoId = req.params.videoId
    try{
await Video.findByIdAndUpdate(videoId,{
    $addToSet :{dislikes:id},
    $pull: {likes:id}
})
res.status(200).json("the video have been disliked")

    }catch(err){
       next(err) 
    }
}