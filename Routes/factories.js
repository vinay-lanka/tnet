var express = require('express');
var connection = require('../connection');
var router = express.Router();


router.post('/registerfactory', (req,res)=>{
    // console.log(req.body);
    var fname = req.body.factoryname;
    var floc = req.body.factorylocation;
    var userdata = JSON.parse(req.cookies.userdata);
    var values = [fname,floc,userdata.oid];
    connection.query('INSERT INTO factories (facname, facloc, oid) VALUES ?',[[values]], (err,response)=>{
        if (err){
            console.log(err.sqlMessage);
            res.send(err.sqlMessage);
        }else{
            res.send('Factory sucessfully added');
        }
    });
});

router.get('/listfactories', (req,res)=>{
    var userdata = JSON.parse(req.cookies.userdata);
    if(req.session.loggedin){
        var factoriespromise = new Promise((resolve,reject)=>{
            connection.query('SELECT facname,facloc,fid FROM factories WHERE oid = ?',[userdata.oid] ,(err,res)=>{
                if (err){
                    console.log(err);
                    reject(err);
                }else{
                    // console.log(res);
                    resolve(res);
                }
            });
        });
        factoriespromise.then((factories)=>{
                jsondata = JSON.stringify(factories)
                // console.log(JSON.parse(jsondata));
                res.send(JSON.parse(jsondata));
        }, (err)=>{
            res.send('err');
            console.log(err);
        });
    }else{
        res.redirect('/');
    }
});

module.exports = router;