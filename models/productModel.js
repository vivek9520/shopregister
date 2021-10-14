const mongoose =  require('mongoose');

const {isEmail} = require('validator')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter an product name'],
       
    },
    category: {
        type: String,
        required: [true,"Please select category!"],
      
        
    },
    subcategory:{
        type: String,
        required:true,
    },
    imageurl:{
        type:String,
        required:true,
    },
    imageID:{
        type:String,
        required:true
    },
  
    discreption:{
        type:String
    },
    shopID:{
        type:String,
        required:true
    }
    
   
},
{timestamps:true});

const ProductModel = mongoose.model('Product',productSchema);

module.exports = ProductModel;