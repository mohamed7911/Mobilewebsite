const phonesApp=require('../models/modelApp')
function socketController(io)
{
  
  io.on("connection",(Socket)=>{
    Socket.on('hamada',async(data)=>{
      const result= await phonesApp.find({});
      io.emit('replay',result);
    })
  })
}

module.exports=socketController