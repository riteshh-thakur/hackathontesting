import mongoose from "mongoose";
const Schema=mongoose.Schema;

const UserSchema =new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },pwd:{
        type:Boolean,
        default:false
    },
    age:{
        type:Number,
        required :true
    },
    bloodGroup:{
        type:String,
        required:true
    }
});
const UserModel=mongoose.model('user',UserSchema);
export default UserModel;