const Router = require("express").Router();
const {isSignedIn,signin,signout, signup} = require("../controllers/authController.js");
const {check} = require("express-validator");
Router
    .route("/signup")
    .post([
        check('name', "Name should be Atleast of 3 character").isLength({min: 5}),
        check("email", "Email is required").isEmail(),
        check("password", "Password should be atleast of 8 characters").isLength({min: 8})
    ], signup);

Router
    .route("/signout")
    .get(signout);

Router
    .route("/signin")
    .post([
        check("email", "Email is required").isEmail(),
    ], signin);

Router.route("/testroute",).get(isSignedIn,(req,res)=>{
    res.json({
        message:req.auth
    });
})




   module.exports = Router;
