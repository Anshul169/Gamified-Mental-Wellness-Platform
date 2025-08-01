import mongoose from "mongoose";

const meditationSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    time:{
        type:Number,
        required:true,
        default:54
    },
    date:{
        type:String,
        default:() => new Date().toDateString(), 
    }
},{timestamps:true});

const meditation = mongoose.model("meditation",meditationSchema);

export default meditation;
