require('dotenv').config();
const mongoose=require("mongoose");
const express=require("express");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const app=express();
app.use(cors());
const port=process.env.PORT || 5000;
const authRoutes=require("./routes/auth");
const userRoutes=require("./routes/user");
const categoryRoutes=require("./routes/category");
const productRoutes=require("./routes/product");
const orderRoutes=require("./routes/order");
const stripeRoutes=require("./routes/stripepayment");


app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);
app.use("/api",stripeRoutes);



try{
     mongoose.connect(process.env.DATABASE_URI,
        {useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:false},
    ()=>{
        console.log("DB CONNECTED");
    })
}
catch(error){
    console.log(error);
}


app.listen(port,()=>{
    console.log(`SERVER RUNNING ON ${port}`);
})