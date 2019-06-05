/* The user route
Contains routes to add,initialise,delete,update,list and fetch user details*/
//Requiring modules
var express = require('express');
var connection = require('../connection');
const crypto = require('crypto');
var router = express.Router();

var secret = 'asecretkey';          //Secret key for encryption. Cannot be changed after start and should match the secret of decrypt

function encrypt(text) {            //Encrpytion function. Uses aes128 standard via the crypto package
    encryptalgo = crypto.createCipher('aes128', secret);
    let encrypted = encryptalgo.update(text, 'utf8', 'hex');
    encrypted += encryptalgo.final('hex');
    return encrypted;
}

router.get('/userdetails', (req,res)=>{         //Route to fetch userdetails and load them onto a cookie
    // console.log(req.session);
    var userdetails = fetchuserdetails(req.session.username);       //Function to fetch user data
    userdetails.then((details)=>{
        if(details!='404'){
            jsondata = JSON.stringify(details)
            res.cookie('userdata', jsondata);       //userdata contains user details
            res.send(JSON.parse(jsondata));
        }else{
            res.statusCode(404).send("Could not fetch");        //Send could not fetch
        }
    }, (err)=>{
        console.log(err);
    });
});

router.get('/edituserdetails', (req,res)=>{             //Route for editing user details once initialised
    if(req.session.loggedin){
        res.sendFile('/public/pages/editprofile.html', {'root': './'});
    }else{
        res.redirect('/login');
    }
});

router.get('/listusers', (req,res)=>{                   //Route for listing all users in a particular organisation
    var userdata = JSON.parse(req.cookies.userdata);    //Fetching userdata cookie for oid
    console.log(userdata);
    if(req.session.loggedin){
        connection.query('SELECT username,uid FROM users WHERE oid=?',[[userdata.oid]],(err,response)=>{    //Searches for all usernames,uid for corresponding oid
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

router.get('/adduser', (req,res)=>{     //Serves up the page to add a new user
    if(req.session.loggedin){
        res.sendFile('/public/pages/addusers.html', {'root': './'});
    }else{
        res.redirect('/login');
    }
});

router.post('/makeuser', (req,res)=>{   //Function called in add user to actually make a new user
    var jsondata = req.body;
    // console.log(req.body);
    var values = [];
    var maxuid,oid;
    var promise = new Promise((resolve,reject)=>{
        connection.query('SELECT MAX(uid) as maxid FROM users',(err,res)=>{     //Fetching max uid to increment upon to use as uid
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
        connection.query('SELECT oid FROM users where username = ?', [req.session.username],(err,res)=>{    //Fetch oid to add to particular organisation
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
        values.push([jsondata.username,encrypted,max[0]+1,admin, max[1]]);      //Pushing all values into an array for neat insertion
        if(req.body.password){
            connection.query('INSERT INTO users (username, password, uid, admin, oid) VALUES ?',[values], (err,response)=>{ //Adding all parameters
                if (err){
                    // res.redirect('/user/makeuser');
                    res.send('Error in updating database'); //If err 
                    console.log(err);
                }else{
                    // console.log(response);
                    res.send('Added Successfully');         //If successful send response
                }
            });
        }else{
            res.redirect('/');                              //If no password then prompt for a password
        }
    }, (err)=>{
        console.log(err);
    });
});

 //Remove user from the organisation - can add support to remove only people from 1 organisation but email id is unique so should not be a problem as such
router.post('/removeuser', (req,res)=>{                    
    if(req.body.username!=req.session.username){
        // console.log(req.body);
        connection.query('DELETE FROM users WHERE username = ?', [req.body.username],(err,result)=>{        //Remove user for corresponding username
            if (err){
                console.log(err);
                res.send(err.sqlMessage);                   //On err
            }else{
                res.send('Succesfully deleted');            //On successful deletion
            }
        });
    }else{
        res.send('Cannot delete oneself sorry');            //If user tries to delete himself
    }
});

router.post('/adduserdetails', (req,res)=>{                 //Initialisation of user when no details are found
    var jsondata = req.body;
    var pass = encrypt(jsondata.password);                  //If user needs to update password
    var query = 'UPDATE users SET Name=?, Designation=?, password=? WHERE username=?';
    connection.query(query,[jsondata.name,jsondata.designation,pass,req.session.username],(err,result)=>{       //Store initialisation data in db
        if (err){
            console.log(err);   //if err would redirect to '/' which would redirect back to the initialisation page
            // reject(err);
            res.redirect('/');
        }else{
            // console.log(res);
            // console.log('Details sucessfully updated');
            res.redirect('/'); //if successful
        }
    });
});

router.post('/forgotpass', (req,res)=>{         //Complete this route for sending password
    res.send('Successful');
});

var fetchuserdetails = function(username) {     //Fetch user details function which returns a promise of userdetails.
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