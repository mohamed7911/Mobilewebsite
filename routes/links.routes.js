const appRoutes=require('express').Router();
const modelApp=require('../models/modelApp');
const brandsApp=require('../models/brandModel');
const newsApp=require('../models/newsModel');
appRoutes.get('/',async(req,res)=>{
    const result2= await brandsApp.find({});
    var arr=[];
    for(i=0;i<8;i++){
        arr[i]=result2[i];
    }
    const result=result2.sort(dynamicSort("name"));
    const OS= await modelApp.find({});
    let OSArr=[];
    for (let i = 0; i < OS.length; i++) {
        let count=0;
        for (let j = 0; j < OSArr.length; j++) {
            if (OS[i]["Operating_System"]==OSArr[j]||OS[i]["Operating_System"]==undefined) {
                count++;
            }
        }
        if (count==0) {
            OSArr.push(OS[i]["Operating_System"]);
        }
    }
    res.render('index',{arr,result,OSArr});
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
    await modelApp.insertMany({name,brand,desc,imgurl:req.files[0].path,imgurl2:req.files[1].path});
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
appRoutes.get('/news',async(req,res)=>{
    // var numArray = [{id:1, date:new Date("2021-4-2")},{id:3, date:new Date("2021-4-5")},{id:2, date:new Date("2021-4-1")}];
    // console.log(numArray);
    // console.log(numArray.sort(dynamicSort2("date")));
    // console.log(new Date().getFullYear());
    const result2= await newsApp.find({});
    const result=result2.sort(dynamicSort2("date"));
    console.log("123456789".length);
    res.render('news',{result});
});
appRoutes.get('/add-news',async(req,res)=>{
    res.render('add-news');
});
appRoutes.post('/add-news',async(req,res)=>{
    const {title,desc,date}=req.body;
    console.log(title);
    console.log(desc);
    console.log(date);
    console.log(req.files[0].path);
    await newsApp.insertMany({title,desc,date,imgurl:req.files[0].path});
    res.redirect("/news");
});
appRoutes.get('/news-content/:id',async(req,res)=>{
    const result= await newsApp.find({_id:req.params.id});
    console.log(result[0]["imgurl"]);
    res.render('news-content',{result});
});
appRoutes.get('/brands',async(req,res)=>{
    const result= await brandsApp.find({});
    res.render('index',{result});
});
appRoutes.get('/brands/:name',async(req,res)=>{
    console.log(req.params.name);
    const result= await modelApp.find({Brand:req.params.name.toLowerCase()});
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
appRoutes.get('/phone-finder',async(req,res)=>{
    res.render('phone-finder');
});
appRoutes.post('/search-phone',async(req,res)=>{
    console.log(req.body.search);
    const result= await modelApp.find( { Brand: new RegExp(req.body.search.toLowerCase())  } )
    res.render('phones',{result});
});
appRoutes.get('/Product/:id',async(req,res)=>{
    const results= await modelApp.findOne({_id:req.params.id});
    const resultsKeys=[          'Status',
        'Dimensions',
        'Operating System','Display resolution','Display size',
        'GPU',              'Memory card',        'Internal memory',
        'RAM',              'Primary camera',     'Secondary camera',
        'Battery'
      ]
    res.render('product',{results,resultsKeys});
});
appRoutes.post('/minPhone-finder',async(req,res)=>{
    console.log(req.body);
    // const {name}=req.body;
    // await brandsApp.insertMany({name,imgurl:req.file.path});
    res.redirect("/");
});
appRoutes.get('/Mobiles',async(req,res)=>{
    const fetch = require('node-fetch');
    const response = await fetch(
    'https://parseapi.back4app.com/classes/Cellphonedataset_Dataset_Cell_Phones_Model_Brand?count=1&limit=10000',
    {
    headers: {
        'X-Parse-Application-Id': 'ioxTo1mojEgkENBBRPxJmG5TtbJ1G8Fg0t6HU7Qg', // This is your app's application id
        'X-Parse-REST-API-Key': 'J0cuVA3b0KaGREuUS4iwF5RsHVZ5eJSKqMQJDiRU', // This is your app's REST API key
    }
    }
    );
    const data = await response.json();
    const features=[         
        'Model',            'Brand',
        'Network',          'TwoG',               'ThreeG',
        'FourG',            'Network_Speed',      'GPRS',
        'EDGE',             'Announced',          'Status',
        'Dimensions',       'field13',            'SIM',
        'Display_type',     'Display_resolution', 'Display_size',
        'Operating_System', 'CPU',                'Chipset',
        'GPU',              'Memory_card',        'Internal_memory',
        'RAM',              'Primary_camera',     'Secondary_camera',
        'Loud_speaker',     'Audio_jack',         'WLAN',
        'Bluetooth',        'GPS',                'NFC',
        'Radio',            'USB',                'Sensors',
        'Battery',          'Colors',             'createdAt',
        'updatedAt',        'imgurl'
      ]// Here you have the data that you need
    let co=0;
    let co2=0;
    let cou=[];
    for (let i =0; i < data.results.length; i++) {
        let data2=data.results[i];
        data2['imgurl']=null
        let c=0;
        for (let j = 0; j < features.length; j++) {
            if (data2[features[j]]==undefined) {
                c++;
            }
        }
        cou.push(data2["Model"]);
        if (c<=1) {
            co++;
            // data2['Brand']=data2['Brand'].toLowerCase();
            // await modelApp.insertMany(data2);
        }
        co2++;
    }
    res.json(cou);
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
function dynamicSort2(property) {
    return function(a, b) {
        return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    }
 }
module.exports=appRoutes;
