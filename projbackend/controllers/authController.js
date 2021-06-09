const User = require("../models/user");
const {validationResult} = require("express-validator");
const jwt=require("jsonwebtoken");
const expressjwt=require("express-jwt");
require('dotenv').config();
exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({
                errors:errors.array().map(error=>error.msg)
            });
    }
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res
                .status("400")
                .json({err: "Not able to save user in DB"})
        }
        res.json({name: user.name, email: user.email, id: user._id});

    })

}

exports.signin = (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res
            .status(422)
            .json({
                error:error.array().map(error=>error.msg)  
            });
    }
    const {email,password}=req.body;
    

    User.findOne({email:email},(err,user)=>{
        if(!user){
              return res.status("400").json({
                error:"User email does not exist",
                })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Email and Password do not match"
            })
        }

        const token=jwt.sign({_id:user._id},process.env.SECRET)
        //put token in cooke
        res.cookie("token",token,{expire:new Date()+9999});

        //Send response to frontend
        const {_id,name,email,roles}=user;
        return res.json({token,user:{_id,name,email,roles}})
        }
    )

}

exports.signout = (req, res) => {
res.clearCookie("token");
res.json({
    msg:"User Sign Out Successfully"
})
};

//protected routes
exports.isSignedIn=expressjwt({
    secret:process.env.SECRET,
    userProperty:"auth"
})

 //custommiddlewares

exports.isAuthenticated=(req,res,next)=>{
    let checker=req.profile &&req.auth && req.profile._id==req.auth._id;   //req.profile is going to be set from frontend
    if(!checker){ 
        return res.status(403).json({
            error:"Access Denied" 
        })
    }
    next();
}
exports.isAdmin=(req,res,next)=>{
    if(req.profile.role===0){
        return res.status(403).json({
            err:"No admin Previliges ACCESS DENIED"
        })
    }
    next();
}