import mongoose from "mongoose";

const JournalSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
    content:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})

const Journal = mongoose.model("Journal",JournalSchema);
export default Journal;