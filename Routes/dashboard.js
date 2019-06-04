var express = require('express');
var connection = require('../connection');
var router = express.Router();

router.get('/', (req,res)=>{
    var username = req.session.username;
    if(req.session.loggedin){
        var promise = fetchuserdetails(username);
        promise.then((details)=>{
            if(details!='404'){
                if(details.Designation!= null){
                    var [macdetails] = JSON.parse(req.cookies.macdata);
                    console.log(details.defaultmacid);
                    if(macdetails!=null){
                        console.log(macdetails);
                        res.sendFile('/public/pages/dashboard.html', {'root': './'});
                    }else{
                        res.sendFile('/public/pages/altdashboard.html', {'root': './'});
                    }
                    // res.sendFile('/public/pages/dashboard.html', {'root': './'});
                }else{
                    res.sendFile('/public/pages/makeprofile.html', {'root': './'});
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