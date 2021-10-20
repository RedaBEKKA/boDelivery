"use strict"

// Get Unique err filed Name

const UniqueMessage = error => {
  let output;
  try {
    let fieldName = error.message.split(".$")[1]
    field = field.split(" dub key")[0]
    field = field.substring(0,field.lastIndexOf("_"))
    req.flash("errors",[{
      message: "Un compte avec "+ field + " existe déjà"
    }])
    output = fieldName.chatAt(0).toUpperCase() + fieldName.slice(1) + " existe déjà"
  } catch (error) {
    output = "existe déjà"
  }
  return output;
}

// Get err message from err Object 

exports.errorHandler = error =>{
  let message = "";
  if (error.code){
    switch(error.code){
      case 11000 : 
      case 11001:
        message = UniqueMessage(error);
        break;
      default:
        message = error
    }
  }else{
    for(let errorName in error.errorors){
      if(error.errorors[errorName].message){
        message = error.errorors[errorName].message
      }
    }
  }
  return message;
}