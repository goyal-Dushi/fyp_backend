const Router=require("express").Router();
const {makePayment}=require("../controllers/stripePayment")
Router.post("/stripepayment",makePayment);
module.exports=Router;