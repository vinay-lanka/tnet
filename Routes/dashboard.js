/*The file for the dashboard route
This is the first route called after login or when a machine is selected*/

//Requiring modules
var express = require('express');
var connection = require('../connection');
var router = express.Router();

router.get('/', (req,res)=>{                            //Calling of dashboard route
    var username = req.session.username;                
    if(req.session.loggedin){                           //Checking for logged in - if yes continue else redirect to '/'
        var promise = fetchuserdetails(username);       //Fetching user details from function defined below 
        promise.then((details)=>{
            if(details!='404'){                         //If no username was found would return a 404 - strictly wont happen in this case as user is logged in
                if(details.Designation!= null){         //Checking for a parameter in details to check if user entered details. 
                    var [macdetails] = JSON.parse(req.cookies.macdata);                     //Fetching macdetails from cookie
                    console.log(details.defaultmacid);
                    if(macdetails!=null){                                                   //Upon login - checks for a defaultmac in macdata.
                        console.log(macdetails);
                        res.sendFile('/public/pages/dashboard.html', {'root': './'});       //If macdata exists then load up the default dashboard 
                    }else{
                        res.sendFile('/public/pages/altdashboard.html', {'root': './'});    //If macdata is null then defaultmac wasn't selected. So prompt to select defaultmac
                    }
                }else{
                    res.sendFile('/public/pages/makeprofile.html', {'root': './'});         //If user hasn't entered details server up the make profile page.
                }
            }else{
                res.redirect('/');
            }
        },(err)=>{
            console.log(err);
        });
    }else{
        res.redirect('/');
    }
});

/*  Fetch user details is the function used to fetch user details from db based on the username parameter
    Used here for checking whether a user has logged in for the first time  */

var fetchuserdetails = function(username) {
    var promise = new Promise((resolve,reject)=>{
        connection.query('SELECT * FROM users WHERE username = ?', [username],(err,res)=>{
            if (err){
                console.log(err);
                reject(err);
                // res.redirect('/');
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

/*  DEPRECATED - We do not use fetchmacdetails here because all machine 
    details are loaded onto a macdata cookie on login or upon selection of a machine    */

// var fetchmacdetails = function(oid) {
//     var promise = new Promise((resolve,reject)=>{
//         connection.query('SELECT * FROM machines WHERE oid = ? AND defaultmac=1', [oid],(err,res)=>{
//             if (err){
//                 console.log(err);
//                 reject(err);
//                 // res.redirect('/');
//             }else{
//                 console.log(res);
//                 console.log(Object.keys(res).length);
//                 if(Object.keys(res).length==0){
//                     resolve('404');
//                 }else{
//                     resolve(res);
//                 }
//             }
//         });
//     });
//     return promise;
// }

module.exports = router;