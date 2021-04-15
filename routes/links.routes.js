const appRoutes=require('express').Router();
const modelApp=require('../models/modelApp');
const brandsApp=require('../models/brandModel');
appRoutes.get('/',async(req,res)=>{
    const result= await brandsApp.find({});
    var arr=[];
    for(i=0;i<8;i++){
        arr[i]=result[i];
    }
    res.render('index',{arr});
});
appRoutes.get('/tes',async(req,res)=>{
    const fetch = require('node-fetch');
    const response = await fetch(
        'https://parseapi.back4app.com/classes/Cellphonedataset_Cell_Phone_Models_By_Brand?order=Cell_Phone_Brand',
        {
        headers: {
            'X-Parse-Application-Id': 'ioxTo1mojEgkENBBRPxJmG5TtbJ1G8Fg0t6HU7Qg', // This is your app's application id
            'X-Parse-REST-API-Key': 'J0cuVA3b0KaGREuUS4iwF5RsHVZ5eJSKqMQJDiRU', // This is your app's REST API key
        }
        }
    );
    const data = await response.json(); // Here you have the data that you need
    //console.log(JSON.stringify(data, null, 2));
    var tata=[];
    for(i=0;i<data.results.length;i++)
    tata.push(data.results[i].Cell_Phone_Brand);
    res.json(tata);
});
appRoutes.get('/brands',async(req,res)=>{
    const result2= await brandsApp.find({});
    const result=result2.sort(dynamicSort("name"));
    res.render('brands',{result});
});
appRoutes.get('/add-employee',async(req,res)=>{
    const result= await brandsApp.find({});
    res.render('add',{result});
});
appRoutes.post('/add-employee',async(req,res)=>{
    const {name,brand,desc}=req.body;
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
appRoutes.get('/Contact',async(req,res)=>{
    res.render('Contact');
});
function dynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}
module.exports=appRoutes;
