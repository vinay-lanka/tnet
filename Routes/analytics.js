/*Route to serve up analytic data. Each page should have a Angularjs controller which will send request for populating that page. 
Based on the macdata cookie value, there should be listeners for serving up the machine data*/

var express = require('express');
var router = express.Router();

router.get('/histdata', (req,res)=>{            //Route to serve up the Historical data page
    if(req.session.loggedin){
        res.sendFile('/public/pages/histdata.html', {'root': './'});
    }else{
        res.redirect('/login');
    }
});

router.get('/trendhistdata', (req,res)=>{       //Route to serve up the Trends and Histogram page
    if(req.session.loggedin){
        res.sendFile('/public/pages/trendhistdata.html', {'root': './'});
    }else{
        res.redirect('/login');
    }
});

router.get('/corrdata', (req,res)=>{            //Route to serve up the correlation data page
    if(req.session.loggedin){
        res.sendFile('/public/pages/corrdata.html', {'root': './'});
    }else{
        res.redirect('/login');
    }
});

router.get('/alarmdata', (req,res)=>{           //Route to serve up the alarm data page
    if(req.session.loggedin){
        res.sendFile('/public/pages/alarmdata.html', {'root': './'});
    }else{
        res.redirect('/login');
    }
});

module.exports = router;                        //Exporting routes