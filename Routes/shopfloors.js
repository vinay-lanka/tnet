/*Shopfloor route deals with all functions for the shopfloors*/
//Requiring modules
var express = require('express');
var connection = require('../connection');
var router = express.Router();


router.post('/registershopfloor', (req,res)=>{      //Route to add a new shopfloor to a factory based on fid
    console.log(req.body);
    // res.status(200).send('Successfully added');
    var fid = req.body.factoryname; //The body may contain factoryname but it is an integer being sent as fid
    var sname = req.body.shopfloorname;
    var factorydetails = new Promise((resolve,reject)=>{
        connection.query('SELECT oid FROM factories WHERE fid = ?', [fid],(err,res)=>{      //fetch oid to add as a parameter for shopfloors
            if (err){
                console.log(err);   //if err
                reject(err);
            }else{
                console.log(res);
                Object.keys(res).forEach(function(key) {
                    var row = res[key];
                    console.log(row);
                    // oid=row.oid;
                    resolve(row);   //resolve oid from fid
                });
            }
        });
    });
    factorydetails.then((details)=>{
        console.log(details);
        var values = [sname,details.oid,fid]; //push details of shopfloor
        connection.query('INSERT INTO shopfloors (sname, oid, fid) VALUES ?',[[values]], (err,response)=>{      //Adding these details to the db
            if (err){
                console.log(err.sqlMessage);    //If error send error to frontend
                res.send(err.sqlMessage);
            }else{
                res.send('Shopfloor sucessfully added');    //If successful send successfully added
            }
        });
    }, (err)=>{
        console.log(err);
        res.send({message:err.sqlMessage});     //If err
    });
});

router.get('/listshopfloors', (req,res)=>{      //Route to list all shopfloors in a particular factory
    // console.log(JSON.parse(req.cookies.userdata));
    console.log(JSON.stringify(req.query));     //Query contains factory id for which we need to find shopfloors
    facdetails=JSON.parse(JSON.stringify(req.query));
    if(req.session.loggedin){
        var shopfloorspromise = new Promise((resolve,reject)=>{
            connection.query('SELECT sname,sid FROM shopfloors WHERE fid=?',[facdetails.factoryid] ,(err,res)=>{    //query to find shopfloors for given fid
                if (err){
                    console.log(err);   //if err
                    reject(err);
                }else{
                    // console.log(res);    //if successful
                    resolve(res);
                }
            });
        });
        shopfloorspromise.then((shopfloors)=>{
                jsondata = JSON.stringify(shopfloors)
                // console.log(JSON.parse(jsondata));
                res.send(JSON.parse(jsondata));     //If fetched shopfloor data - send the data
        }, (err)=>{
            res.send('err');
            console.log(err);                       //If err then send err
        });
    }else{
        res.redirect('/');                          //If not logged in redirect to '/'
    }
});
/*Function to delete shopfloor. Will delete all machines in the corresponding shopfloor as well
Uses LEFT JOIN to select all machines in corresponding shopfloor*/
router.get('/deleteshopfloor', (req,res)=>{    
    // console.log(JSON.parse(req.cookies.userdata));
    shopdetails=JSON.parse(JSON.stringify(req.query));
    if(req.session.loggedin){
        var detailspromise = new Promise((resolve,reject)=>{ //Deletion from 2 tables using LEFT JOIN
            connection.query('DELETE FROM shopfloors,machines USING shopfloors LEFT JOIN machines ON shopfloors.sid = machines.sid WHERE shopfloors.sid=?',[shopdetails.shopfloorid] ,(err,res)=>{
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
                res.send({message:"deleted"});      //Sends deleted if successfully deleted
        }, (err)=>{
            res.send('err');
            console.log(err);                       //Sends err 
        });
    }else{          
        res.send('err');                            //If not logged in sends err
    }
});

module.exports = router;
