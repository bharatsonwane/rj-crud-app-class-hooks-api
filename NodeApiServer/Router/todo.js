const express = require('express');
const todoRoute = express.Router()
const _ = require("lodash");

var tododList=[];

todoRoute.use((req,res,next)=>{
    console.log(req)
    next()
})

todoRoute.get("/",(req,res,next)=>{
    res.statusCode=200
    res.json(JSON.stringify(tododList))
});

todoRoute.post("/",(req,res,next)=>{
    
    var todo = req.body;
    tododList.push(todo);
    res.statusCode=200
    res.json(JSON.stringify(tododList))
})
todoRoute.delete("/:id",(req,res,next)=>{
    var todeleteId = req.params.id
    _.remove(tododList,(o)=>{
        return o.id==todeleteId;
    })
    res.json(tododList)
})
todoRoute.delete("/",(req,res,next)=>{
var todeleteId = req.body.id
_.remove(tododList,(o)=>{
    return o.id==todeleteId;
})
res.json(tododList)

})
todoRoute.put("/",(req,res,next)=>{
    var updatedToDo=req.body
    var todoId= req.body.id
    var index = _.findIndex(tododList,(o)=>{
        return o.id==todoId;

    })
    tododList[index]=updatedToDo;
    res.json(tododList)
})

module.exports=todoRoute