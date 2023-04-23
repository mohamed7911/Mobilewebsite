const mongoose=require('mongoose');
let phonesSchema=mongoose.Schema({
    title:{type:String,require:true},
    brand:{type:String,require:true},
    data:{type:Array,require:true},
    img:{type:String,require:true}
});
const phones=mongoose.model('phones',phonesSchema);
module.exports=phones