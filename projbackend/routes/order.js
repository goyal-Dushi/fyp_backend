const Router=require("express").Router();
const {getUserById,pushOrderInPurchaseList}=require("../controllers/userController");
const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/authController");
const {getOrderById,createOrder,getAllOrders,getOrderStatus,updateStatus}=require("../controllers/orderController");
const {updateStock}=require("../controllers/productController");

//PARAMS:
Router.param("userId",getUserById);
Router.param("orderId",getOrderById);


//ROUTES:

Router.route("/order/create/:userId").post(isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder);

Router.route("/order/all/:userId").get(isSignedIn,isAuthenticated,isAdmin,getAllOrders);

//Status  of order
Router.route("/order/status/:userId").get(isSignedIn,isAuthenticated,isAdmin,getOrderStatus)
Router.route("/order/:orderId/status/:userId").put(isSignedIn,isAuthenticated,isAdmin,updateStatus)
module.exports=Router;