var express = require('express');
var connection = require('../connection');
const crypto = require('crypto');
var router = express.Router();

var secret = 'asecretkey';

function encrypt(text) {
    encryptalgo = crypto.createCipher('aes128', secret);
    let encrypted = encryptalgo.update(text, 'utf8', 'hex');
    encrypted += encryptalgo.final('hex');
    return encrypted;
}

router.get('/userdetails', (req,res)=>{
    // console.log(req.session);
    var userdetails = fetchuserdetails(req.session.username);
    userdetails.then((details)=>{
        if(details!='404'){
            jsondata = JSON.stringify(details)
            res.cookie('userdata', jsondata);
            res.send(JSON.parse(jsondata));
        }else{
            res.statusCode(404).send("Could not fetch");
        }
    }, (err)=>{
        console.log(err);
    });
});

router.get('/edituserdetails', (req,res)=>{
    if(req.session.loggedin){
        res.sendFile('/public/pages/editprofile.html', {'root': './'});
    }else{
        res.redirect('/login');
    }
});

router.get('/listusers', (req,res)=>{
    var userdata = JSON.parse(req.cookies.userdata);
    if(req.session.loggedin){
        connection.query('SELECT username,uid FROM users WHERE oid=?',[[userdata.oid]],(err,response)=>{
            if (err){
                console.log(err.sqlMessage);
                res.send(err.sqlMessage);
            }else{
                res.send(response);
            }
        });
    }else{
        res.redirect('/login');
    }
});

router.get('/adduser', (req,res)=>{
    if(req.session.loggedin){
        res.sendFile('/public/pages/addusers.html', {'root': './'});
    }else{
        res.redirect('/login');
    }
});

router.post('/makeuser', (req,res)=>{
    var jsondata = req.body;
    // console.log(req.body);
    var values = [];
    var maxuid,oid;
    var promise = new Promise((resolve,reject)=>{
        connection.query('SELECT MAX(uid) as maxid FROM users',(err,res)=>{
            if (err){
                reject(err);
            }else{
                // console.log(res);
                Object.keys(res).forEach(function(key) {
                    var row = res[key];
                    // console.log(row.maxid);
                    maxuid=row.maxid;
                });
            }
        });
        connection.query('SELECT oid FROM users where username = ?', [req.session.username],(err,res)=>{
            if (err){
                reject(err);
            }else{
                // console.log(res);
                Object.keys(res).forEach(function(key) {
                    var row = res[key];
                    // console.log(row);
                    oid=row.oid;
                    // resolve(maxoid);
                });
                resolve([maxuid,oid]);
            }
        });
    });
    promise.then((max)=>{
        // console.log(max);
        var encrypted = encrypt(jsondata.password);
        var admin;
        if(jsondata.admin==1){
            admin = 1;
        }else{
            admin = 0;
        }
        values.push([jsondata.username,encrypted,max[0]+1,admin, max[1]]);
        if(req.body.password){
            connection.query('INSERT INTO users (username, password, uid, admin, oid) VALUES ?',[values], (err,response)=>{
                if (err){
                    // res.redirect('/user/makeuser');
                    res.send('Error in updating database');
                    console.log(err);
                }else{
                    // console.log(response);
                    res.send('Added Successfully');
                }
            });
        }else{
            res.redirect('/');
        }
    }, (err)=>{
        console.log(err);
    });
});

router.post('/removeuser', (req,res)=>{
    if(req.body.username!=req.session.username){
        // console.log(req.body);
        connection.query('DELETE FROM users WHERE username = ?', [req.body.username],(err,result)=>{
            if (err){
                console.log(err);
                res.send(err.sqlMessage);
            }else{
                res.send('Succesfully deleted')
            }
        });
    }else{
        res.send('Cannot delete oneself sorry');
    }
});

router.post('/adduserdetails', (req,res)=>{
    var jsondata = req.body;
    var pass = encrypt(jsondata.password);
    var query = 'UPDATE users SET Name=?, Designation=?, password=? WHERE username=?';
    connection.query(query,[jsondata.name,jsondata.designation,pass,req.session.username],(err,result)=>{
        if (err){
            console.log(err);
            reject(err);
            res.redirect('/');
        }else{
            // console.log(res);
            // console.log('Details sucessfully updated');
            res.redirect('/');
        }
    });
});

router.post('/forgotpass', (req,res)=>{
    res.send('Successful');
});

var fetchuserdetails = function(username) {
    var promise = new Promise((resolve,reject)=>{
        connection.query('SELECT * FROM users WHERE username = ?', [username],(err,res)=>{
            if (err){
                console.log(err);
                reject(err);
            }else{
                // console.log(res);
                // console.log(Object.keys(res).length);
                if(Object.keys(res).length==0){
                    resolve('404');
                }else{
                    Object.keys(res).forEach(function(key) {
                        var row = res[key];
                        resolve(row);
                    });
                }
            }
        });
    });
    return promise;
}

module.exports = router;