//Here the insert ,update ,delete and view the record using the node js .

const express = require('express');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp')
const fs = require('fs');
var app = express();
app.set('view engine', 'ejs');




var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Views/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})



var upload = multer({
  storage: storage
}).single('file');


app.post('/UploadFile', upload, async (req, res, next) => {
  console.log(req.file);

  try {

    await sharp(req.file.path).resize(300, 200).png().toFile('Views/uploads/' + req.file.originalname);

    fs.unlink(req.file.path, (err) => {

      if (err) {
        console.error(err)
        return
      }
      res.send('File:' + req.file.fieldname);
      //file removed
    })


  } catch (error) {
    console.log(error);
  }


  //  res.send('File:'+req.file.fieldname);
})


app.get('/form', (req, res) => {
  res.render("form", {
    "data": "2e312"
  });

});
app.listen('3000', () => {
  console.log('Connect and Running On Port 3000');
});

