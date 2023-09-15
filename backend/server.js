const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const { csvDataValidation, xmlDataValidation } = require("./service");
app.use(express.static("./public"))
 
// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))

var allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// File Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Express Upload Robobank transaction
app.post("/uploadfile", upload.single("uploadfile"), async (req, res) => {
    
    if(req.file.mimetype == 'text/csv'){ 
        await csvDataValidation(req.file.filename).then((response)=>{
            res.send(response);
        }).catch((error)=>{  
            res.send(error);
        })  
    }else if( req.file.mimetype ==  'text/xml'){
        await xmlDataValidation(req.file.filename).then((response)=>{
            res.send(response);
        }).catch((error)=>{  
          res.send(error);
      }) 
    }else{
        res.send({
            status:'error',
            message:'invalid File format'
        });
    }
});

// Create a Server
let server = app.listen(8080, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
