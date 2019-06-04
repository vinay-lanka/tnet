var express = require('express');
var router = express.Router();

router.get('/histdata', (req,res)=>{
    if(req.session.loggedin){
        res.sendFile('/public/pages/histdata.html', {'root': './'});
    }else{
        res.redirect('/login');
    }
});

router.get('/trendhistdata', (req,res)=>{
    if(req.session.loggedin){
        res.sendFile('/public/pages/trendhistdata.html', {'root': './'});
    }else{
        res.redirect('/login');
    }
});

router.get('/corrdata', (req,res)=>{
    if(req.session.loggedin){
        res.sendFile('/public/pages/corrdata.html', {'root': './'});
    }else{
        res.redirect('/login');
    }
});

router.get('/alarmdata', (req,res)=>{
    if(req.session.loggedin){
        res.sendFile('/public/pages/alarmdata.html', {'root': './'});
    }else{
        res.redirect('/login');
    }
});

module.exports = router;