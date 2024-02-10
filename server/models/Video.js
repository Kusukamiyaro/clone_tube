import mongoose from "mongoose"

const VideoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique:false
    },
    desc: {
        type: String,
        required: true,
        unique:true
    },
    videoTitle: {
        type: String,
        required: true,
   
    },
    imgUrl: {
        type: String,
        required: true,
        
    },
    videoUrl: {
        type: String,
        required: true,
        
    },
    views: {
        type: Number,
        dafault: 0,
        
    }
    ,tags:{
        type:[String],
        default:[]
    },
    likes:{
        type:[String],
        default:[]
    },
    dislikes:{
        type:[String],
        default:[]
    }
},{timestamps:true});
export default mongoose.model('Video',VideoSchema);