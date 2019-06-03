var express = require('express');
var connection = require('../connection');
var router = express.Router();

router.post('/registermachine', (req,res)=>{
    console.log(req.body);
    var userdata = JSON.parse(req.cookies.userdata);
    var fid = parseInt(req.body.factoryid);
    var sid = parseInt(req.body.shopfloorid);
    var oid = userdata.oid;
    var values = [fid,sid,oid,req.body.macid,0];
        connection.query('INSERT INTO machines (fid, sid, oid, macid, defaultmac) VALUES ?',[[values]], (err,response)=>{
            if (err){
                console.log(err.sqlMessage);
                res.send(err.sqlMessage);
            }else{
                res.send('Machine sucessfully added');
            }
        });
});

router.get('/listmachines', (req,res)=>{
    // console.log(JSON.parse(req.cookies.userdata));
    console.log(JSON.stringify(req.query));
    shopdetails=JSON.parse(JSON.stringify(req.query));
    if(req.session.loggedin){
        var machinespromise = new Promise((resolve,reject)=>{
            connection.query('SELECT macid,mid FROM machines WHERE sid=?',[shopdetails.shopfloorid] ,(err,res)=>{
                if (err){
                    console.log(err);
                    reject(err);
                }else{
                    // console.log(res);
                    resolve(res);
                }
            });
        });
        machinespromise.then((machines)=>{
                jsondata = JSON.stringify(machines)
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

router.get('/showmachine', (req,res)=>{
    // console.log(JSON.parse(req.cookies.userdata));
    macdetails=JSON.parse(JSON.stringify(req.query));
    if(req.session.loggedin){
        var detailspromise = new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM machines WHERE mid=?',[macdetails.machineid] ,(err,res)=>{
                if (err){
                    console.log(err);
                    reject(err);
                }else{
                    // console.log(res);
                    resolve(res);
                }
            });
        });
        detailspromise.then((details)=>{
                jsondata = JSON.stringify(details)
                // console.log(JSON.parse(jsondata));
                res.cookie('macdata', jsondata);
                res.send({message:"fetched"});
        }, (err)=>{
            res.send('err');
            console.log(err);
        });
    }else{
        res.send('err');
    }
});

router.get('/makedefault', (req,res)=>{
    var userdata = JSON.parse(req.cookies.userdata);
    var uid = userdata.uid;
    console.log(req.query);
    var mid = parseInt(req.query.machineid);
    // connection.query('UPDATE machines SET defaultmac=0 WHERE oid=?',[oid],(err,res)=>{
    //     if (err){
    //         console.log(err);
    //     }else{
    //         console.log(res);
    //     }
    // });
    // connection.query('UPDATE machines SET defaultmac=1 WHERE mid=?',[mid],(err,response)=>{
    //     if (err){
    //         console.log(err);
    //         res.send({message:"Could not set default. Please try again"});
    //     }else{
    //         console.log(response);
    //         res.send({message:"Default Machine Updated"});
    //     }
    // });
    connection.query('UPDATE users SET defaultmacid=? WHERE uid=?',[mid,uid],(err,result)=>{
        if (err){
            console.log(err);
            res.send({message:"Could not set default. Please try again"});
        }else{
            console.log(result);
            var detailspromise = new Promise((resolve,reject)=>{
                connection.query('SELECT * FROM machines WHERE mid=?',[mid] ,(err,res)=>{
                    if (err){
                        console.log(err);
                        reject(err);
                    }else{
                        // console.log(res);
                        resolve(res);
                    }
                });
            });
            detailspromise.then((details)=>{
                    jsondata = JSON.stringify(details)
                    // console.log(JSON.parse(jsondata));
                    res.cookie('macdata', jsondata);
                    res.send({message:"Default Machine Updated"});
            }, (err)=>{
                console.log(err);
            });
        }
    });
});

router.get('/deletemachine', (req,res)=>{
    // console.log(JSON.parse(req.cookies.userdata));
    macdetails=JSON.parse(JSON.stringify(req.query));
    if(req.session.loggedin){
        var detailspromise = new Promise((resolve,reject)=>{
            connection.query('DELETE FROM machines WHERE mid=?',[macdetails.machineid] ,(err,res)=>{
                if (err){
                    console.log(err);
                    reject(err.sqlMessage);
                }else{
                    // console.log(res);
                    resolve(res);
                }
            });
        });
        detailspromise.then((details)=>{
                jsondata = JSON.stringify(details)
                // console.log(JSON.parse(jsondata));
                // res.cookie('macdata', jsondata);
                res.send({message:"deleted"});
        }, (err)=>{
            res.send('err');
            console.log(err);
        });
    }else{
        res.send('err');
    }
});

module.exports = router;