const express=require("express");

const adminRouter=require("./Router/admin");
const userRouter=require("./Router/user");
const todoRoute = require("./Router/todo");
const bodyParser = require("body-parser")

const cors = require('cors')

const app=express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(express.json())

app.set('view engine','pug');
app.set('views','Views')

app.use("/admin",adminRouter);
app.use("/user",userRouter);

app.use("/todo",todoRoute)

app.listen(3005);