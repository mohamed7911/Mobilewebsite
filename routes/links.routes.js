const appRoutes=require('express').Router();
const modelApp=require('../models/modelApp');
const brandsApp=require('../models/brandModel');
const newsApp=require('../models/newsModel');
const userModel=require('../models/userModel');
const phonesApp=require('../models/modelApp');
const coveragesApp=require('../models/coverageModel');
const auth=require('../midelware/auth');//in front comment section or fav
const http = require("https");
const request = require('request');
var unirest = require("unirest");
const fs = require('fs');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const {validationResult} = require('express-validator');
const searchValidation=require("../midelware/validation/search");
const handleValidation = require('../midelware/handleValidation');
const signUpValidator = require('../midelware/validation/signUpValidator');
var cloudinary = require('cloudinary').v2;
appRoutes.get('/',async(req,res)=>{
    const result2= await brandsApp.find({});
    var arr=[];
    for(i=0;i<8;i++){
        arr[i]=result2[i];
    }
    const result=result2.sort(dynamicSort("name"));
    const data= await phonesApp.find({});
    let topData=[];
    let OSArr=[];
    console.log(data[0]["data"][4]["Platform"][0]["OS"]);
    for (let i = 0; i < data.length; i++) {
        if (data[i].title=="Apple iPhone 12"||data[i].title=="Apple iPhone 12 Pro Max"||data[i].title=="Apple iPhone 12 Pro"||data[i].title=="Apple iPhone 11"||data[i].title=="Xiaomi Redmi 9A"||data[i].title=="Xiaomi Redmi 9"||data[i].title=="Samsung Galaxy A12"||data[i].title=="Xiaomi Redmi Note 9") {
            topData.push(data[i])
        }
        for (let j = 0; j < data[i]["data"].length; j++) {
            if (Object.keys(data[i]["data"][j])[0]=="Platform") {
                if (data[i]["data"][j]["Platform"][0]["OS"]!= undefined) {
                    OSArr.push(data[i]["data"][j]["Platform"][0]["OS"].split(',')[0])
                }
            }
        }
    }
    OSArr=Array.from(new Set(OSArr))
    res.render('index',{arr,result,OSArr,topData});
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
// appRoutes.post('/add-employee',async(req,res)=>{
//     const {name,brand,desc}=req.body;
//     await modelApp.insertMany({name,brand,desc,imgurl:req.files[0].path,imgurl2:req.files[1].path});
//     res.redirect('/');
// });
appRoutes.post('/add-employee',async(req,res)=>{
    const file=req.file;
    cloudinary.uploader.upload(file.path, function(error, result) { console.log(result) });
    console.log(file );
    res.redirect('/add-employee')
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
    let result = await phonesApp.find({}).limit(10);
    let result2= await brandsApp.find({});
    result2=result2.sort(dynamicSort("name"));
    res.render('phones',{result,result2, errorsValidators: req.flash("errorsValidators")});
});
for (let i = 2; i < 6; i++) {
    appRoutes.get('/phones/'+i,async(req,res)=>{
        let results = await phonesApp.find({});
        let x=[]
        for (let j = 0; j < results.length; j++) {
            if(j>=(i-1)*10 && j<=i*10)
                x.push(results[j])
        }
        console.log(x);
        let result=x
        let result2= await brandsApp.find({});
        result2=result2.sort(dynamicSort("name"));
        res.render('phones',{result,result2, errorsValidators: req.flash("errorsValidators")});
    });
}
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
appRoutes.get('/reviews',async(req,res)=>{
    // var numArray = [{id:1, date:new Date("2021-4-2")},{id:3, date:new Date("2021-4-5")},{id:2, date:new Date("2021-4-1")}];
    // console.log(numArray);
    // console.log(numArray.sort(dynamicSort2("date")));
    // console.log(new Date().getFullYear());
    const result2= await newsApp.find({});
    const result=result2.sort(dynamicSort2("date"));
    res.render('Reviews',{result});
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
    let data = JSON.parse(fs.readFileSync("Data/saf.json"));
    let result2= await brandsApp.find({});
    result2=result2.sort(dynamicSort("name"));
    let result=[]
    for (let i = 0; i < data.length; i++) {
        if(req.params.name.toLowerCase()==data[i].brand.toLowerCase())
            result.push(data[i])
    }
    res.render('phones',{result,result2, errorsValidators: req.flash("errorsValidators")});
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
// appRoutes.get('/coverage',async(req,res)=>{
//     let result= await coveragesApp.find({});
//     let data={"Egypt": ["GSM 900, GSM 1800",
//     "UMTS 2100",
//     "LTE 2100",
//     "",
//     "Latest devices"]}
//     res.render('coverage',{result});
// });
appRoutes.get('/coverage/:name',async(req,res)=>{
    let result= await coveragesApp.find({});
    const result2= await brandsApp.find({});
    const result3= await phonesApp.find({});
    let arr=[];
    let latestPhones=[]
    let months={January:1,February:2,March:3,April:4,May:5,June:6,July:7,August:8,September:9,October:10,November:11,December:12}
    for (let i = 0; i < result3.length; i++) {
        if (months[result3[i]["data"][1]["Launch"][1]["Status"].split(" ")[(result3[i]["data"][1]["Launch"][1]["Status"].split(" ").length)-2]]==(new Date().getMonth()+1)&&result3[i]["data"][1]["Launch"][1]["Status"].split(" ")[(result3[i]["data"][1]["Launch"][1]["Status"].split(" ").length)-3].replace(",","")=="2020") {
            latestPhones.push(result3[i])
        }
    }
    console.log(latestPhones.length);
    for(i=0;i<21 ;i++){
        if (i==18) {
            i++
        }
        arr[i]=result2[i];
    }
    let data={}
    for (let i = 0; i < result.length; i++) {
        if (result[i]['country']==req.params.name) {
            data=result[i]
        }
    }
    console.log(data['SecondG']);
    res.render('coverage',{result,data,arr,latestPhones});
});
appRoutes.post('/search-phone',searchValidation,handleValidation('/phones'),async(req,res)=>{
    const data= JSON.parse(fs.readFileSync("Data/saf.json"));
    let result=[]
    for (let i = 0; i < data.length; i++) {
        if(data[i].title.toLowerCase().includes(req.body.search.toLowerCase()))
            result.push(data[i])
    }
    let result2= await brandsApp.find({});
    result2=result2.sort(dynamicSort("name"));
    res.render('phones',{result,result2,errorsValidators: req.flash("errorsValidators")});
});
appRoutes.get('/Product/:name',async(req,res)=>{
    let data = JSON.parse(fs.readFileSync("Data/saf.json"));let result=[]
    for (let i = 0; i < data.length; i++) {
        if(req.params.name.toLowerCase()==data[i].title.toLowerCase())
            result.push(data[i])
    }
    // const results= await modelApp.findOne({_id:req.params.id});
    // const resultsKeys=[          'Status',
    //     'Dimensions',
    //     'Operating System','Display resolution','Display size',
    //     'GPU',              'Memory card',        'Internal memory',
    //     'RAM',              'Primary camera',     'Secondary camera',
    //     'Battery'
    //   ]
    console.log(result[0]['data'][1]['Launch'][0]['Announced']);
    res.render('product',{result});
});
appRoutes.post('/minPhone-finder',async(req,res)=>{
    console.log(req.body);
    const data=  JSON.parse(fs.readFileSync("Data/saf.json"));
    let result=[]
    for (let i = 0; i < data.length; i++) {
        year=data[i]["data"][1]["Launch"][0]["Announced"].split(",")[0]
        OS=""
        if(data[i]["data"][4]["Platform"]!=undefined)
            if(Object.keys(data[i]["data"][4]["Platform"][0])[0]=="OS")
                OS=data[i]["data"][4]["Platform"][0]["OS"].split(',')[0]
        brand=data[i]["brand"].toLowerCase()
        if(year<=req.body.maxYear&&year>=req.body.minYear&&OS==req.body.OS&&brand==req.body.brand.toLowerCase())
            result.push(data[i])
    }
    // const {name}=req.body;
    // await brandsApp.insertMany({name,imgurl:req.file.path});
    res.render('phones',{result});
});
appRoutes.get('/aaa',async(req,res)=>{
    // let result = JSON.parse(fs.readFileSync("Data/coverage.json"));
    // console.log(Object.keys(result[0])[0]);
    // await coveragesApp.insertMany({country:Object.keys(result[0])[0]},
    //                         {SecondG:"asfasdf"},
    //                         {ThirdG:"asfasf"},
    //                         {FourthG:"dsgsgsdg"},
    //                         {FifthG:"asfgasf"});
    // // await modelApp.insertMany({country:});

    // // const results= await modelApp.findOne({_id:req.params.id});
    // // const result= await brandsApp.find({});
    // for (let i = 0; i < result.length; i++) {
    //     await coveragesApp.insertMany({country:Object.keys(result[i])[0],
    //                             SecondG:result[i][Object.keys(result[i])[0]][0],
    //                             ThirdG:result[i][Object.keys(result[i])[0]][1],
    //                             FourthG:result[i][Object.keys(result[i])[0]][2],
    //                             FifthG:result[i][Object.keys(result[i])[0]][3]});
    //     console.log(Object.keys(result[i])[0]);
    //     console.log(result[i][Object.keys(result[i])[0]][0]);
    //     console.log(result[i][Object.keys(result[i])[0]][1]);
    //     console.log(result[i][Object.keys(result[i])[0]][2]);
    //     console.log(result[i][Object.keys(result[i])[0]][3]);
    // }
    // console.log(result.length);
    // var fs = require('fs');
    // var crypto = require('crypto');

    // var key = '14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd';
    // var cipher = crypto.createCipher('aes-256-cbc', key);
    // var input = fs.createReadStream('test.txt');
    // var output = fs.createWriteStream('test.txt.enc');

    // input.pipe(cipher).pipe(output);

    // output.on('finish', function() {
    // console.log('Encrypted file written to disk!');
    // });
});
appRoutes.get('/Mobiles',async(req,res)=>{
    const fetch = require('node-fetch');
    const response = await fetch(
    'https://parseapi.back4app.com/classes/Cellphonedataset_Dataset_Cell_Phones_Model_Brand?count=1&limit=10',
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
    // let co=0;
    // let co2=0;
    // let cou=[];
    // for (let i =0; i < data.results.length; i++) {
    //     let data2=data.results[i];
    //     data2['imgurl']=null
    //     let c=0;
    //     for (let j = 0; j < features.length; j++) {
    //         if (data2[features[j]]==undefined) {
    //             c++;
    //         }
    //     }
    //     cou.push(data2["Model"]);
    //     if (c<=1) {
    //         co++;
    //         // data2['Brand']=data2['Brand'].toLowerCase();
    //         // await modelApp.insertMany(data2);
    //     }
    //     co2++;
    // }
    res.json(data);
});
appRoutes.get('/compare',async(req,res)=>{
    let result= await modelApp.findOne({title:'Apple iPhone 12'});
    let result1=result
    let result2=result
    res.render('compare',{result,result1,result2});
});
appRoutes.post('/compare',async(req,res)=>{
    let result= await modelApp.findOne({title:req.body.name});
    let result1= await modelApp.findOne({title:req.body.name1});
    let result2= await modelApp.findOne({title:req.body.name2});
    console.log(req.body);
    res.render('compare',{result,result1,result2});
});
appRoutes.get('/SignUpHandle',async(req,res)=>{
    res.render('Register');
});
appRoutes.post('/SignUpHandle',signUpValidator,handleValidation('/SignUpHandle'),async(req,res)=>{
    const { userName, email , password } = req.body;
    const user = await userModel.findOne({ email });
    console.log(user);
    if (user) {
        res.redirect('/SignUpHandle');
    } else {
        bcrypt.hash(password, 8, async function (err, hash) {
            if (err) {
                res.json({ error: "hash error" })
            } else {
                await userModel.insertMany({ userName, email, password: hash })
                res.redirect('/');
            }
        });
    }
});
appRoutes.get('/SignInHandle',async(req,res)=>{
    res.render('Login');
});
appRoutes.post('/SignInHandle',signUpValidator[1,2],handleValidation('/SignInHandle'),async(req,res)=>{
    const {email , password } = req.body;
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user) {
        res.redirect('/SignUpHandle');
    } else {
        const match = await bcrypt.compare(password, user.password);
        if(match) {
            req.session.userID = user._id;
            req.session.userName = user.userName;
            req.session.isLoggedIn = true;
            res.redirect('/')
        }
        else{
            res.redirect('/SignInHandle');
        }
    }
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
