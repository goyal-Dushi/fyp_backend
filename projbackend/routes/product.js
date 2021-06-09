const Router=require("express").Router();
const {getProductById,createProduct,getProduct,getAllProducts,photo,deleteProduct,updateProduct,getAllUniqueCategories}=require("../controllers/productController");
const {getUserById}=require("../controllers/userController");
const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/authController");
const {check} = require("express-validator");

//Params
Router.param("productId",getProductById);
Router.param("userId",getUserById);


// Routes
Router.route("/product/create/:userId").post(isSignedIn,isAuthenticated,isAdmin,createProduct);
Router.route("/product/:productId/:userId").put(isSignedIn,isAuthenticated,isAdmin,updateProduct);

Router.route("/product/:productId").get(getProduct);
Router.route("/product/:productId/:userId").delete(isSignedIn,isAuthenticated,isAdmin,deleteProduct);
Router.route("/product/photo/:productId").get(photo);
Router.route("/products").get(getAllProducts);
Router.route("/products/categories",getAllUniqueCategories);
module.exports=Router;