import mongoose from "mongoose";
const messageschema= new mongoose.Schema({
message:{
    type:String,
 },
 sender:{
    type:String
 },
 reciever:{
    type:String
 },

    chat:{
        type: mongoose.Schema.ObjectId,
    ref:'chat'}
    
},{
    timestamps:true
})
const message=mongoose.model('message',messageschema);
export default message