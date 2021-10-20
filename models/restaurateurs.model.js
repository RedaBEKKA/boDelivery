const Mongoose = require("mongoose"),
  Types = Mongoose.Schema.Types;

const modelName = "restaurateur";


const restaurateurSchema = new Mongoose.Schema({},
  {strict:false }
);

module.exports = Mongoose.model(modelName, restaurateurSchema);