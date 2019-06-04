var express = require('express');
var connection = require('../connection');
var router = express.Router();


router.post('/registerfactory', (req, res) => {
    // console.log(req.body);
    var fname = req.body.factoryname;
    var floc = req.body.factorylocation;
    var userdata = JSON.parse(req.cookies.userdata);
    var values = [fname, floc, userdata.oid];
    connection.query('INSERT INTO factories (facname, facloc, oid) VALUES ?', [[values]], (err, response) => {
        if (err) {
            console.log(err.sqlMessage);
            res.send(err.sqlMessage);
        } else {
            res.send('Factory sucessfully added');
        }
    });
});

router.get('/listfactories', (req, res) => {
    var userdata = JSON.parse(req.cookies.userdata);
    if (req.session.loggedin) {
        var factoriespromise = new Promise((resolve, reject) => {
            connection.query('SELECT facname,facloc,fid FROM factories WHERE oid = ?', [userdata.oid], (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    // console.log(res);
                    resolve(res);
                }
            });
        });
        factoriespromise.then((factories) => {
            jsondata = JSON.stringify(factories)
            // console.log(JSON.parse(jsondata));
            res.send(JSON.parse(jsondata));
        }, (err) => {
            res.send('err');
            console.log(err);
        });
    } else {
        res.redirect('/');
    }
});

router.get('/deletefactory', (req, res) => {
    // console.log(JSON.parse(req.cookies.userdata));
    facdetails = JSON.parse(JSON.stringify(req.query));
    if (req.session.loggedin) {
        var sqlquery = 'DELETE FROM factories,shopfloors,machines USING factories LEFT JOIN shopfloors ON factories.fid = shopfloors.fid LEFT JOIN machines ON factories.fid = machines.fid WHERE factories.fid=?';
        var detailspromise = new Promise((resolve, reject) => {
            connection.query(sqlquery, [facdetails.factoryid], (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err.sqlMessage);
                } else {
                    // console.log(res);
                    resolve(res);
                }
            });
        });
        detailspromise.then((details) => {
            jsondata = JSON.stringify(details)
            // console.log(JSON.parse(jsondata));
            // res.cookie('macdata', jsondata);
            res.send({ message: "deleted" });
        }, (err) => {
            res.send('err');
            console.log(err);
        });
    } else {
        res.send('err');
    }
});

module.exports = router;