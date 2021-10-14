const ProductModel = require('../models/productModel')



// post product
module.exports.product_post = async(req, res)=>{

    console.log(req.file.filename);

    
   
    try {
        var product = req.body;
        product.imageID = req.file.filename;
        product.imageurl = req.file.path;
        const pro = await ProductModel.create(product);
        res.status(201).json(pro);

    }
    catch (error){
    //    const errors = handleErrors(error);
        res.status(400).json({error})
    }
}

//get all product
module.exports.product_get = async(req, res)=>{
    await ProductModel.find({ }, 
        null, 
        { sort: { 'date': 'asc' }, limit: 10 }, function(error, users){
        if(error){
            res.status(404).json("Users not found")
        }
        else {
            res.status(200).json(users);
        }
    });
    
}

//get product base on ID
module.exports.product_get_byID = async(req, res)=>{
    await ProductModel.findById(req.params.id, function(error, shop){
            if(error){
                res.status(404).json("Shop not found")
            }
            else{
                res.status(200).json(shop)
            }
    });
    
}
