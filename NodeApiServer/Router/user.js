const express= require("express");
const path = require("path");


const router=express.Router();
const dirname=path.dirname(process.mainModule.filename)
router.get("/",(req,res,next)=>{
    // res.sendFile(path.join(dirname,'Views',"home.html"));
    res.render("home",{name:"yogesh"})
})

module.exports=router