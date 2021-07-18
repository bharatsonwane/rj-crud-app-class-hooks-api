const mysql = require("mysql2");

const db=mysql.createPool({
    host:"localhost",
    user:"root" ,
    database:"test",
    password:"yogesh123"
})

module.exports=db.promise();