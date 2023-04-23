const mongoose=require('mongoose');
let coverageSchema=mongoose.Schema({
    country:{type:String},
    SecondG:{type:String},
    ThirdG:{type:String},
    FourthG:{type:String},
    FifthG:{type:String}
},{timestamps:true});
const coverages=mongoose.model('coverage',coverageSchema);
module.exports=coverages