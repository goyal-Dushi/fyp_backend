const Product=require("../models/product");
const formidable=require('formidable');
const _=require('lodash');
const fs=require("fs");
const {validationResult} = require("express-validator");

// CUSTOMMIDDLEWARE:
exports.getProductById=(req,res,next,id)=>{
    Product.findById(id).exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"No product found"
            });
        }
        req.product=product;
        // console.log(id);
        next();
    })
}

exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data)
    }
    next();
}

// CONTROLLERS:

exports.createProduct=(req,res)=>{
    let form=formidable.IncomingForm();
    form.keepExtensions=true; // we definitely want to save the format of the file
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"Problem with the image file"
            });
        }
        //NOTE: Destructure the fields
     const {name,description,category,price,stock,photo}=fields;

TODO:// Restrictions on fields

if(
    !name||
    !description||
    !price||
    !category||
    !stock){
        return res.status(400).json({
            error:"Please include all fields"
        })
        }
        
        let product=new Product(fields);
NOTE: //Handling Files
    if(file.photo){
        if(file.photo.size>3000000){
            return res.status(400).json({
                error:"File size too big!"
            })
        }
        
        product.photo.data=fs.readFileSync(file.photo.path)
        product.photo.contentType=file.photo.type;  //IMPORTANT:Saving the photo extension
    }
    console.log(product);

NOTE: //Save to db
    
product.save((err,product)=>{
        if(err){
            res.status(400).json({
                error: "Saving product in DB failed"
            })
        }
        res.json(
            product
        )

    })
    })

}

exports.updateProduct=(req,res)=>{
    let form=formidable.IncomingForm();
    form.keepExtensions=true; // we definitely want to save the format of the file
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"Problem with the image file"
            });
        }
        
// NOTE: Updation Code
let product =req.product;
product=_.extend(product,fields);
    //NOTE:Handling Files
    if(file.photo){
        if(file.photo.size>3000000){
            return res.status(400).json({
                error:"File size too big!"
            })
        }
        product.photo.data=fs.readFileSync(file.photo.path)
        product.photo.contentType=file.photo.type;  //IMPORTANT: saving the photo extension
    }

    // NOTE: save to db
    product.save((err,product)=>{
        if(err){
            res.status(400).json({
                error: "Updation of product in DB failed"
            })
        }
        res.json(
            product
        )

    })
    })

}

exports.getProduct=(req,res)=>{
req.product.photo=undefined;
return res.json(req.product)
}

exports.deleteProduct=(req,res)=>{
    let product=req.product;
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete the product"
            })
        }
        res.json({
            message:"Product deleted"
        })
    })
}

exports.getAllProducts=(req,res)=>{
let limit=req.query.limit?parseInt(req.query.limit):8;
let sortBy=req.query.sortBy?req.query.sortBy:"_id";
Product.find()
.select("-photo") //NOTE:  - here means i dont want to select photo
.populate('category','name')
.limit(limit)
.sort([[sortBy,"asc"]])
    .exec((err,products)=>{
    if(err){
        return res.status(400).json({
            error:"NO product found"
        })
    }
    return res.json(products)
})    
}

exports.getAllUniqueCategories=(req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err){
            return res.status(400).json({
                error:"No category found"
            })
        }
        res.json(category);
    })
}

exports.updateStock=(req,res,next)=>{
    let myOperations=req.body.order.products.map(prod=>{
        return {
            updateOne:{
                filter:{_id:prod._id},
                update:{$inc:{stock:-prod.count,sold:+prod.count}}
            }
        }
    })
    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err){
            return res.status(400).json({error:"Bulk Operations failed"})
        }
        next();
    })
}