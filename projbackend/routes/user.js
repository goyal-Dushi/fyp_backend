const Router=require("express").Router();
const {getUserById,getUser,getAllUsers,updateUser,userPurchaseList}=require("../controllers/userController");
const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/authController");


Router.param("userId",getUserById);

Router.route("/user/:userId").get(isSignedIn,isAuthenticated,getUser);
Router.route("/user/:userId").put(isSignedIn,isAuthenticated,updateUser);
Router.route("/orders/user/:userId").get(isSignedIn,isAuthenticated,userPurchaseList);
Router.route("/users").get(getAllUsers);
module.exports=Router;