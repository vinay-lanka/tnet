/*The tnetadmin page is exclusive to toshiba admins where they add one admin for each comapany*/
//Requiring modules
var express = require('express');
const crypto = require('crypto');
var connection = require('../connection');
var router = express.Router();

var secret = 'asecretkey';      //Secret key for encrypting password. Should not be changed once started and should be the same as decrypting secret

function encrypt(text) {        //Encrpyition function. Uses aes128 standard via the crypto module
    encryptalgo = crypto.createCipher('aes128', secret);
    let encrypted = encryptalgo.update(text, 'utf8', 'hex');
    encrypted += encryptalgo.final('hex');
    return encrypted;
}


router.get('/', (req,res)=>{    //Serve up the page to add admins
    res.sendFile('/public/pages/tnetadmin.html', {'root': './'});
});

router.post('/makeadmin', (req,res)=>{      //Make admin adds a new user with the admin parameter set to 1
    // console.log(req.body);
    var jsondata = req.body;
    var values = [];
    var maxuid,maxoid;
    var promise = new Promise((resolve,reject)=>{
        connection.query('SELECT MAX(uid) as maxuid,MAX(oid) as maxoid FROM users',(err,res)=>{
            if (err){
                reject(err);
            }else{
                // console.log(res);
                Object.keys(res).forEach(function(key) {
                    var row = res[key];
                    maxuid=row.maxuid;
                    maxoid=row.maxoid;
                });
                resolve([maxuid,maxoid]);
            }
        });
    });
    promise.then((max)=>{
        console.log(max);
        var encrypted = encrypt(jsondata.password);
        values.push([jsondata.username,encrypted,max[0]+1,1,max[1]+1]);
        if(req.body.password){
            connection.query('INSERT INTO users (username, password, uid, admin, oid) VALUES ?',[values], (err,response)=>{
                if (err){
                    // console.log(err.sqlMessage);
                    res.send(err.sqlMessage);
                }else{
                    res.send('Admin sucessfully added');
                }
            });
        }else{
            res.send('Could not add user');
        }
    }, (err)=>{
        res.send('Could not add user');
        console.log(err);
    });
});

module.exports = router;