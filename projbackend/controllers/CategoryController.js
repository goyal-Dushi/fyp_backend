const Category=require("../models/category");
const formidable=require('formidable');
const _=require('lodash');

exports.getCategoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if(err){
            return res.status(400).json({
                err:"Category not found in db"
            })
        }
    req.category=category;
    next();
    })
    
}


exports.createCategory=(req,res)=>{
 const category=new Category(req.body);
    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                err:"Not able to save category in DB"
            })
        }
        res.json(category);
    });    
}

exports.updateCategory=(req,res)=>{
   let form=formidable.IncomingForm();
    form.keepExtensions=true; // we definitely want to save the format of the file
    form.parse(req,(err,fields,file)=>{
       
        
// NOTE: Updation Code
let category =req.category;
category=_.extend(category,fields);
    
    // NOTE: save to db
    category.save((err,category)=>{
        if(err){
            res.status(400).json({
                error: "Updation of product in DB failed"
            })
        }
        res.json(
            category
        )

    })
    })

}
exports.deleteCategory=(req,res)=>{
    const category=req.category;
    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                err:"Not able to delete category in DB"
            })
        }
        res.json({message:"Category deleted"});
    })
}
exports.getCategory = ((req,res) => {
	return res.json(req.category);
});
exports.getAllCategory=(req,res)=>{ 
Category.find().exec((err,items)=>{
    if(err){
        return res.status(400).json({
            err:"No category found"
        })
    }
    res.json(items);
})
}

