var express = require("express");
var mySql = require("./sqlconnection");
var app = express();
var bodyParser = require("body-parser");

var authentication = require("./routes/auth");


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// var connection = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     database:"poker"
// },(err,data)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(data)
//     }
// })
app.use("/auth",authentication);

mySql.query('SELECT CURDATE()',function(error ,result,fiels){
    if(error) throw error;
    console.log(result)
});


app.listen(2000,()=>{
    console.log("Started")
})