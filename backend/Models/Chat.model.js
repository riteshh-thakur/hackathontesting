import mongoose from "mongoose";
 
const chatschema= new mongoose.Schema({
 
    userone:{
        type: mongoose.Schema.ObjectId,
    ref:'user'},
    usertwo:{
        type: mongoose.Schema.ObjectId,
        ref:'Doctor'},
    
},{
    timestamps:true
})
const chat=mongoose.model('chat',chatschema);
export default chat