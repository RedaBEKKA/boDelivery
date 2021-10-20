const Mongoose = require("mongoose"),
  Types = Mongoose.Schema.Types;

const modelName = "transporteur";


const transporteurSchema = new Mongoose.Schema({},
  {strict:false }
);

module.exports = Mongoose.model(modelName, transporteurSchema);