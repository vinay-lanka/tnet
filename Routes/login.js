var express = require('express');
const crypto = require('crypto');
var connection = require('../connection');
var router = express.Router();

var secret = 'asecretkey';

function decrypt(encrypted) {
    decryptalgo = crypto.createDecipher('aes128', secret);
    let decrypted = decryptalgo.update(encrypted, 'hex', 'utf8');
    decrypted += decryptalgo.final('utf8');
    return decrypted;
}

router.get('/', (req,res)=>{
    if(req.session.loggedin){
        res.redirect('/dashboard')
    }else{
        res.sendFile('/public/pages/login.html', {'root': './'});
    }
});

router.post('/authenticate', (req,res,next)=>{
    // console.log(req.body);
    var username = req.body.username;
	var password = req.body.password;
    if (username && password) {
        var promise = new Promise((resolve,reject)=>{
            connection.query('SELECT password,defaultmacid FROM users WHERE username = ?', [username],(err,res)=>{
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
        promise.then((result)=>{
            // console.log(result);
            var encryptedpassword = result.password;
            if(encryptedpassword!='404'){
                // console.log("Encrypted - " + encryptedpassword);
                decryptedpass = decrypt(encryptedpassword);
                if(decryptedpass == password){
                    req.session.loggedin = true;
                    req.session.username = username;
                    // res.send({message:'loggedin'});
                    var detailspromise = new Promise((resolve,reject)=>{
                        connection.query('SELECT * FROM machines WHERE mid=?',[result.defaultmacid],(err,res)=>{
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
                            res.send({message:'loggedin'});
                            // res.send({message:"fetched"});
                    }, (err)=>{
                        res.send('err');
                        console.log(err);
                    });
                }else{
                    res.send({message:'Wrong password'});
                }
            }else{
                res.send({message:'Wrong username'});
            }
        }, (err)=>{
            console.log(err);
            res.send({message:err.sqlMessage});
        });
	} else {
        res.send({message:'Please enter both username and password'});
    }
});

router.get('/forgotpassword', (req,res)=>{
    res.sendFile('/public/pages/forgotpass.html', {'root': './'});
});

module.exports = router;