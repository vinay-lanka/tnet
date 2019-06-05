/*Login route with authentication route*/
//Requiring modues
var express = require('express');
const crypto = require('crypto');
var connection = require('../connection');
var router = express.Router();

var secret = 'asecretkey';          //Secret key for denryption. Cannot be changed later and should be the same as encryption key.

function decrypt(encrypted) {       //Function for decryption of passwords. Uses the aes128 standard with the crypto package
    decryptalgo = crypto.createDecipher('aes128', secret);
    let decrypted = decryptalgo.update(encrypted, 'hex', 'utf8');
    decrypted += decryptalgo.final('utf8');
    return decrypted;
}

router.get('/', (req,res)=>{        //When called check for login. If not logged in serve him the login page.
    if(req.session.loggedin){
        res.redirect('/dashboard')
    }else{
        res.sendFile('/public/pages/login.html', {'root': './'});   //Login page
    }
});

router.post('/authenticate', (req,res)=>{       //Authenticate route
    // console.log(req.body);
    var username = req.body.username            //Login details
	var password = req.body.password;
    if (username && password) {
        var promise = new Promise((resolve,reject)=>{
            connection.query('SELECT password,defaultmacid FROM users WHERE username = ?', [username],(err,res)=>{      //Checking for corresponding encrypted password in db
                if (err){
                    console.log(err);
                    reject(err);                                //Error checking db
                }else{
                    // console.log(res);
                    // console.log(Object.keys(res).length);
                    if(Object.keys(res).length==0){
                        resolve('404');                         //This error pops up when there was no password to match 404 user not found case
                    }else{
                        Object.keys(res).forEach(function(key) {
                            var row = res[key];
                            resolve(row);                       //Encrypted password found and resolved for corresponding username
                        });
                    }
                }
            });
        });
        promise.then((result)=>{
            // console.log(result);
            var encryptedpassword = result.password;
            if(encryptedpassword!='404'){                       //Provided user exists
                // console.log("Encrypted - " + encryptedpassword);
                decryptedpass = decrypt(encryptedpassword);     //Decrypt the encrypted password from db
                if(decryptedpass == password){                  //Compare the passwords
                    req.session.loggedin = true;                //If true - logged in
                    req.session.username = username;
                    // res.send({message:'loggedin'});            
                    var detailspromise = new Promise((resolve,reject)=>{            //We're setting up the macdata cookie with the defaultmacdata
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
                            res.cookie('macdata', jsondata);                        //Setting macdata with default macdata
                            res.send({message:'loggedin'});                         //Sending logged in to redirect frontend to dashboard
                            // res.send({message:"fetched"});   
                    }, (err)=>{
                        res.send('err');                                            //Would send err as defaultmacdata could not be found
                        console.log(err);
                    });
                }else{
                    res.send({message:'Wrong password'});   //Passwords did not match
                }
            }else{
                res.send({message:'Wrong username'});       //404 user not found
            }
        }, (err)=>{
            console.log(err);
            res.send({message:err.sqlMessage});             //Only happens with error in db so send sqlmessage
        });
	} else {
        res.send({message:'Please enter both username and password'});
    }
});

router.get('/forgotpassword', (req,res)=>{                                          //Forget password route to send forget password page. Not completely developed.
    res.sendFile('/public/pages/forgotpass.html', {'root': './'});
});

module.exports = router;