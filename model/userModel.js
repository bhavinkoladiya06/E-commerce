const mongoose=require('mongoose')
const Schema=mongoose.Schema

var userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const USER = mongoose.model("user", userSchema);

module.exports=USER