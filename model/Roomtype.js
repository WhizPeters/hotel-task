import mongoose from 'mongoose';


const roomtype= mongoose.Schema({
    name:{
        type:String,
        required:true
    }
});
const Roomtypes= mongoose.model('RoomType',roomtype);

export default Roomtypes;