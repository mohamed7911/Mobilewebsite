const mongoose=require('mongoose');
let brandsSchema=mongoose.Schema({
    name:{type:String,require:true},
    imgurl:{type:String}
});
const brands=mongoose.model('brands',brandsSchema);
module.exports=brands