import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
      
        
    },
    image: {
        type: String,

    },
    subsriber: {
        type: Number,
       default:0
    },
    subscribeUsers: {
        type: [String]
    },
    fromGoogle:{
        type: Boolean,
        default: false,
      
    }
},{timestamps:true});
export default mongoose.model('users',UserSchema);