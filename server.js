const express=require('express');
const bodyparser = require('body-parser').urlencoded({extended:true});
const path=require('path');
const mongoose=require('mongoose');
const app=express();
const appRoutes=require('./routes/links.routes');
const multer=require('multer');
const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session)
var flash = require('connect-flash');
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name:'dad10qyqd',
    api_key:'836953499948529',
    api_secret:'IQUnWoU-7LzOIoGSPFyzsMxdvOM'
});
const  store = new MongoDBStore({
    uri: "mongodb+srv://route:route@route.vsbcb.mongodb.net/AlwaDB",
    collection: 'mySessions'
    });
    app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
}))
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'images')
    },
    filename: function (req, file, cb) {
    cb(null,Date.now()+'-'+file.originalname)
    }
})
app.use(multer({dest:'images',storage:storage}).single('img'))
app.use(flash());
app.use(bodyparser);
app.use(appRoutes);
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use('/images',express.static(path.join(__dirname,'images')));
mongoose.connect("mongodb+srv://route:route@route.vsbcb.mongodb.net/AlwaDB",{useNewUrlParser:true,useUnifiedTopology:true});
let server= app.listen(process.env.PORT||3000,()=>{
    console.log("server is running");
});
const io=require('socket.io')(server)
require('./Controller/socket.controller')(io)