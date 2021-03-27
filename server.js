const express=require('express');
const bodyparser = require('body-parser').urlencoded({extended:true});
const path=require('path');
const mongoose=require('mongoose');
const app=express();
const appRoutes=require('./routes/links.routes');
const multer=require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'images')
    },
    filename: function (req, file, cb) {
    cb(null,Date.now()+'-'+file.originalname)
    }
})
app.use(multer({dest:'images',storage:storage}).single('img'))
app.use(bodyparser);
app.use(appRoutes);
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use('/images',express.static(path.join(__dirname,'images')));
mongoose.connect("mongodb+srv://route:route@route.vsbcb.mongodb.net/AlwaDB",{useNewUrlParser:true,useUnifiedTopology:true});
app.listen(process.env.PORT||3000,()=>{
    console.log("server is running");
});