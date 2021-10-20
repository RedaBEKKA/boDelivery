const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require('./config/db')
const app = express();

require("dotenv").config({
  path : "./config/config.env"
});


// Connect To DB
connectDB();


// use bodyParser
app.use(bodyParser.json());



//app.use(cors());
// Dev Logginf Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(cors())
  app.use(morgan('dev'))
}

// load All Routes 
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");


//Use Routes
app.use("/api/",authRouter);
app.use("/api/",userRouter);

app.use((req,res,next) =>{
  res.status(404).json({
    success : false,
    message : "Page Not Founded"
  })
})

const PORT = process.env.PORT;

app.listen(PORT,()=>{
 console.log(`Admin App listening on PORT ${PORT}`);
});