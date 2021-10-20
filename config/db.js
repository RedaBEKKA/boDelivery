const mongoose = require("mongoose");

// const connectDB = async () =>{
//   const connection = await mongoose.connect(process.env.MONGO_URL,{
//     useNewUrlParser : true,
//     useUnifiedTopology : true
//   });
//   console.log(`MongoDB Connected on : ${connection.connection.host}`);
// };

const connectDB = async () =>{ 
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Server Running on Port: http://localhost:${process.env.PORT}`))
  .catch((error) => console.log(`${error} did not connect`));
}


module.exports = connectDB;