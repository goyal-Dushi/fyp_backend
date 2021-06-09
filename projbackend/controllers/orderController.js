const {Order,ProductCart}=require("../models/order");


exports.getOrderById=(req,res,id,next)=>{
    Order.find(id)
    .populate("products.product","name price")
    .exec((err,order)=>{
        if(err){return res.status(400).json({error:"Cant find the order"})}
    })
   return req.order=order; 
   next();
}


exports.createOrder=(req,res)=>{
    req.body.order.user=req.profile;
    const order=new Order(req.body.order)
    order.save((err,order)=>{
        if(err){return res.status(400).json({error:"Failed to save the order in DB"})}
        res.status(200).json({order});
    })
}
exports.getAllOrders=(req,res)=>{
    Order.find()
    .populate("user","_id name")
    .exec((err,order=>{
        if(err){return res.status(400).json({error:"Failed to retieve orders"})}
        res.json(order)
    }))
}
exports.getOrderStatus=(req,res)=>{
res.json(Order.schema.path("status").enumValues);
}
exports.updateStatus=(req,res)=>{
Order.update(
    {_id:req.body.orderId},
    {$set:{status:req.body.status}},
    (err,order)=>{
        if(err){return res.status(400).json({error:"Failed to update order status"})}
        res.json(order)
    })
}
