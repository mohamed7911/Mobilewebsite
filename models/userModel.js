const mongoose=require('mongoose');
let usersSchema=mongoose.Schema({
    userName:{type:String},
    email:{type:String},
    password:{type:String},
    role:{type:String,default:'user'}
},{timestamps:true});
const users=mongoose.model('user',usersSchema);
module.exports=users