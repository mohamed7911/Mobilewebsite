const mongoose=require('mongoose');
let phonesSchema=mongoose.Schema({
    brand:{type:String,require:true},
    name:{type:String,require:true},
    desc:{type:String,unique:true},
    imgurl:{type:String},
    imgurl2:{type:String}
});
const phone=mongoose.model('phone',phonesSchema);
module.exports=phone