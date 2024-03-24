import mongoose from "mongoose";
import Roomtypes from "./Roomtype.js";
const roomDb=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    roomtype:{
        type:mongoose.Types.ObjectId,
        ref:Roomtypes,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})
const room= mongoose.model("Room", roomDb);

export default room;