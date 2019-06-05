/*The factories route. Contains routes to add,list and delete factories */

//Requiring modules
var express = require('express');
var connection = require('../connection');
var router = express.Router();


router.post('/registerfactory', (req, res) => {         //Route for registering a factory
    // console.log(req.body);
    var fname = req.body.factoryname;                   //The request body contains details of the factory
    var floc = req.body.factorylocation;
    var userdata = JSON.parse(req.cookies.userdata);    //User data cookie is used to fetch oid for a factory
    var values = [fname, floc, userdata.oid];
    connection.query('INSERT INTO factories (facname, facloc, oid) VALUES ?', [[values]], (err, response) => {  //Query to push into db
        if (err) {
            console.log(err.sqlMessage);
            res.send(err.sqlMessage);   //If err send err
        } else {
            res.send('Factory sucessfully added');      //Would be displayed as an alert.
        }
    });
});

router.get('/listfactories', (req, res) => {            //Route to list factories in an organisation
    var userdata = JSON.parse(req.cookies.userdata);    //User data cookie used to fetch oid 
    if (req.session.loggedin) {
        var factoriespromise = new Promise((resolve, reject) => {
            connection.query('SELECT facname,facloc,fid FROM factories WHERE oid = ?', [userdata.oid], (err, res) => { //oid is used to fetch all factories with that oid
                if (err) {
                    console.log(err);   //if err reject
                    reject(err);
                } else {
                    // console.log(res);
                    resolve(res);       //if successful resolve
                }
            });
        });
        factoriespromise.then((factories) => {
            jsondata = JSON.stringify(factories)
            // console.log(JSON.parse(jsondata));
            res.send(JSON.parse(jsondata));     //Parse the data and send
        }, (err) => {
            res.send('err');
            console.log(err);                   //If any err send error to be displayed
        });
    } else {
        res.redirect('/');                      //If not logged in redirect to '/'
    }
});

/*Delete factory deletes factories and all shopfloors and machines in that factory with the same fid
This can be achieved by using LEFT JOIN*/
router.get('/deletefactory', (req, res) => {
    // console.log(JSON.parse(req.cookies.userdata));
    facdetails = JSON.parse(JSON.stringify(req.query));
    if (req.session.loggedin) {
        var sqlquery = 'DELETE FROM factories,shopfloors,machines USING factories LEFT JOIN shopfloors ON factories.fid = shopfloors.fid LEFT JOIN machines ON factories.fid = machines.fid WHERE factories.fid=?';
        var detailspromise = new Promise((resolve, reject) => {
            connection.query(sqlquery, [facdetails.factoryid], (err, res) => {
                if (err) {
                    console.log(err);                   //If error reject err
                    reject(err.sqlMessage);
                } else {
                    // console.log(res);
                    resolve(res);                       //If successfully deleted send res
                }
            });
        });
        detailspromise.then((details) => {
            jsondata = JSON.stringify(details)
            // console.log(JSON.parse(jsondata));
            // res.cookie('macdata', jsondata);
            res.send({ message: "deleted" });           //Send deleted upon successful deletion
        }, (err) => {
            res.send('err');                            //Send error upon any error and log
            console.log(err);
        });
    } else {
        res.send('err');                                //If not logged in send error
    }
});

module.exports = router;