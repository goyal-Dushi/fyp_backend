const Router = require("express").Router();
const {getCategoryById, createCategory,getCategory,getAllCategory,updateCategory,deleteCategory} = require("../controllers/CategoryController");
const {getUserById, getUser, getAllUsers, updateUser, userPurchaseList} = require("../controllers/userController");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/authController");
//params
Router.param("userId", getUserById);
Router.param("categoryId", getCategoryById);

//Routes
Router
    .route("/category/create/:userId")
    .post(isSignedIn, isAuthenticated, isAdmin, createCategory);

Router
    .route("/category/:categoryId/:userId")
    .put(isSignedIn, isAuthenticated, isAdmin, updateCategory);


Router
    .route("/category/:categoryId")
    .get(getCategory);

Router
    .route("/category/:categoryId/:userId")
    .delete(isSignedIn, isAuthenticated, isAdmin,deleteCategory);

Router
    .route("/categories")
    .get(getAllCategory);

module.exports = Router;