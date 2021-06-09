const express=require('express');
const app=express();
const port =8000;

const admin=(req,res)=>{
    res.end("This is admin Dashboard")
};
const isloggedin=(req,res,next)=>{
    console.log("is logged in")
    next();
}
const isadmin=(req,res,next)=>{
    console.log("is admin running")
    next();
}
app.route('/admin').get(isloggedin,isadmin,admin);

app.route("/").get((req,res)=>{
res.end("Root page");
})
app.route("/login").get((req,res)=>{
    res.end("Login page");
    })
app.listen(port,()=>{
    console.log(`Server started on ${port}`);
})


