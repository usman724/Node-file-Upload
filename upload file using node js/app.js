//Here the insert ,update ,delete and view the record using the node js .

const express = require('express');
const path = require('path');
const multer = require('multer');
var app = express();
app.set('view engine','ejs'); 



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Views/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
  }
})



var upload = multer({
   storage:storage
}).single('file');
app.post('/UploadFile',upload,(req,res,next)=>{
       res.send('File:'+req.file.fieldname);
})
app.get('/form',(req,res)=>{
      res.render("form",{
      "data" : "2e312"
     });

});
app.listen('3000',()=>{
  console.log('Connect and Running On Port 3000');
});
