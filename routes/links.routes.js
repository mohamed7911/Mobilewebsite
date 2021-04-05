const appRoutes=require('express').Router();
const modelApp=require('../models/modelApp');
const brandsApp=require('../models/brandModel');
appRoutes.get('/',async(req,res)=>{
    const result= await brandsApp.find({});
    var arr=[];
    for(i=0;i<8;i++){
        arr[i]=result[i];
    }
    console.log(arr);
    res.render('index',{arr});
});
appRoutes.get('/brands',async(req,res)=>{
    const result= await brandsApp.find({});
    res.render('brands',{result});
});
appRoutes.get('/add-employee',async(req,res)=>{
    const result= await brandsApp.find({});
    res.render('add',{result});
});
appRoutes.post('/add-employee',async(req,res)=>{
    const {name,brand,desc}=req.body;
    console.log(brand); 
    await modelApp.insertMany({name,brand,desc,imgurl:req.file.path});
    res.redirect('/');
});
appRoutes.get('/delete/:id',async(req,res)=>{
    await modelApp.findOneAndDelete({_id:req.params.id})
    res.redirect('/');
});
appRoutes.get('/edit/:id',async(req,res)=>{
    const results= await modelApp.findOne({_id:req.params.id});
    const result= await brandsApp.find({});
    res.render('edit',{results,result});
});
appRoutes.post('/edit-employee/:id',async(req,res)=>{
    await modelApp.findOneAndUpdate({_id:req.params.id},
                            {First_name:req.body.First_name,
                            Last_name:req.body.Last_name,
                            email:req.body.email,
                            password:req.body.password});
    res.redirect('/');
});
appRoutes.get('/phones',async(req,res)=>{
    const result= await modelApp.find({});
    res.render('phones',{result});
});
appRoutes.get('/brands',async(req,res)=>{
    const result= await brandsApp.find({});
    res.render('index',{result});
});
appRoutes.get('/brands/:name',async(req,res)=>{
    const result= await modelApp.find({brand:req.params.name});
    res.render('phones',{result});
});
appRoutes.get('/add-brand',async(req,res)=>{
    res.render('add-brand');
});
appRoutes.post('/add-brand',async(req,res)=>{
    const {name}=req.body;
    await brandsApp.insertMany({name,imgurl:req.file.path});
    res.redirect("/");
});
module.exports=appRoutes;
