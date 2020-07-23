
var mysql = require("mysql");

var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"poker"
},(err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})

module.exports = connection ;