import { boolean, required } from "joi";
import mongoose from "mongoose";
 
const appointment =new mongoose.Schema({
patient:{
 type: mongoose.Schema.ObjectId,
 ref:user,
 required:true
},
doctor:{
type:mongoose.Schema.ObjectId,
ref:doctor,
required:true
}
,
status:{
    type:boolean,
    default:false
}
})
export const appointmentmodel=mongoose.model('appointment',appointment)