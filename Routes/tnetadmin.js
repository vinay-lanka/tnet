var express = require('express');
const crypto = require('crypto');
var connection = require('../connection');
var router = express.Router();

var secret = 'asecretkey';

function encrypt(text) {
    encryptalgo = crypto.createCipher('aes128', secret);
    let encrypted = encryptalgo.update(text, 'utf8', 'hex');
    encrypted += encryptalgo.final('hex');
    return encrypted;
}


router.get('/', (req,res)=>{
    res.sendFile('/public/pages/tnetadmin.html', {'root': './'});
});

router.post('/makeadmin', (req,res)=>{
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