 const mongoose=require("mongoose");
const {ObjectId}=require("mongoose");

const ProductCartSchema=new mongoose.Schema({
    products:{type:ObjectId,ref:"Products"},
    name:{type:String},
    count:{type:Number},
    price:{type:Number},
    seller:String
}) ;

const ProductCart=mongoose.model("ProductCart",ProductCartSchema);

const orderSchema=new mongoose.Schema({
     product:{ProductCartSchema},
     transaction_id:{},
     amount:{type:Number},
     address:{},
     status:{type:String, default:"",enum:["Cancelled","Del ivered","Shipped","Processing","Recieved"]},
     updated:Date,
     user:{
         type:ObjectId,
         ref:"User"
     }
 },{timestamps:true})
 const Order=mongoose.model("Order",orderSchema);

module.export={ProductCart,Order};