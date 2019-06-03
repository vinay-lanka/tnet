var express = require('express');
var connection = require('../connection');
var router = express.Router();


router.post('/registershopfloor', (req,res)=>{
    console.log(req.body);
    // res.status(200).send('Successfully added');
    var fid = req.body.factoryname;
    var sname = req.body.shopfloorname;
    var factorydetails = new Promise((resolve,reject)=>{
        connection.query('SELECT oid FROM factories WHERE fid = ?', [fid],(err,res)=>{
            if (err){
                console.log(err);
                reject(err);
            }else{
                console.log(res);
                Object.keys(res).forEach(function(key) {
                    var row = res[key];
                    console.log(row);
                    // oid=row.oid;
                    resolve(row);
                });
            }
        });
    });
    factorydetails.then((details)=>{
        console.log(details);
        var values = [sname,details.oid,fid];
        connection.query('INSERT INTO shopfloors (sname, oid, fid) VALUES ?',[[values]], (err,response)=>{
            if (err){
                console.log(err.sqlMessage);
                res.send(err.sqlMessage);
            }else{
                res.send('Shopfloor sucessfully added');
            }
        });
    }, (err)=>{
        console.log(err);
        res.send({message:err.sqlMessage});
    });
});

router.get('/listshopfloors', (req,res)=>{
    // console.log(JSON.parse(req.cookies.userdata));
    console.log(JSON.stringify(req.query));
    facdetails=JSON.parse(JSON.stringify(req.query));
    if(req.session.loggedin){
        var shopfloorspromise = new Promise((resolve,reject)=>{
            connection.query('SELECT sname,sid FROM shopfloors WHERE fid=?',[facdetails.factoryid] ,(err,res)=>{
                if (err){
                    console.log(err);
                    reject(err);
                }else{
                    // console.log(res);
                    resolve(res);
                }
            });
        });
        shopfloorspromise.then((shopfloors)=>{
                jsondata = JSON.stringify(shopfloors)
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
