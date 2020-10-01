var waterfall = require('async-waterfall');
var mySql = require("../sqlconnection");
var bcrypt = require("bcrypt");

//Registration API
exports.register=(req,res)=>{
    waterfall([
        (callback) => {
             if(req.body.name !='' ){
                callback(null,req.body);
             }else{
                callback("Parameters missing",[]);
             }
        },(params,callback)=> {
            console.log(req.body,"<======")
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    callback("Technical Issue",[])
                }else{
                    var q = 'INSERT INTO users (name, email_id, password) VALUES ("'+params.name+'","'+params.email_id+'","'+hash+'")';
                    mySql.query(q,(err,data,fields)=>{
                        if(err){
                            console.log(err)
                           // callback("Parameters missing",[]);
                        }else{
                            callback(null,data);
                        }
                    })
                }
            })
         
        },
    ],function (err, result){
        if(!err){
            res.json({
                code:200,
                status:1,
                message:"your otp",
                data:result
            });
        }else{
             return res.status(401).json({code:200,status:0, message:err, data:""})
        }
    });   
}

//Login API
exports.login=(req,res)=>{
    waterfall([
        (callback) => {
             if(req.body.name !='' ){
                callback(null,req.body);
             }else{
                callback("Parameters missing",[]);
             }
        },(params,callback)=> {
            var Sql = "SELECT * FROM users WHERE email_id = '"+params.email_id+"'";
            mySql.query(Sql,(error,data)=>{
                if(error){
                    console.log(error)
                    //callback("Data not found",[])
                }else{
                    if(data){
                        callback(null,data)
                    }else{
                        callback("Data not found",[])
                    }
                   
                }
            } )         
        },(params,callback)=> {
            var password = req.body.password;
            var hash = params.password;
            console.log(JSON.parse(JSON.stringify(params)),"<===")
            bcrypt.compare(password, hash , function (err, result){
                if(err){
                    console.log(err)
                    callback("Technical Issue",[])
                }else{
                    if(result){
                        callback(null,params)
                    }else{
                        callback("Paswword mismatch",[])
                    }
                   
                }
            })
         
        },
    ],function (err, result){
        if(!err){
            res.json({
                code:200,
                status:1,
                message:"Login Succesfully",
                data:result
            });
        }else{
             return res.status(401).json({code:200,status:0, message:err, data:""})
        }
    });   
}
