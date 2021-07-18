//in-built module

const fs=require("fs")

//third party module
const express= require("express");
const db = require("../util/datebase")




const router= express.Router();

router.get("/user",(req,res,next)=>{
    // console.log(req.params.id)
    // console.log(req.query.id)
    db.execute("SELECT * FROM test.table;").then((result)=>{
        console.log("database",result)
    }).catch((error)=>{
        console.log(error)
    })
    res.status(200).send("<form action='/admin/add-user' Method='POST'><input name='name'/><button type='submit'>submit</button></form>")
});

router.post("/add-user",(req,res,next)=>{
    console.log(req.body)
    fs.writeFileSync("user.txt",JSON.stringify(req.body))
    res.status(201).send("user created")
})

module.exports=router