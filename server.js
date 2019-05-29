var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
require('dotenv').config();
app.use(cookieParser());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    // console.log(res.status);
    if(req.session.loggedin){
        res.redirect('/dashboard');
    }else{
        res.redirect('/login');
    }
});

app.get('/logout', (req,res)=>{
    req.session.loggedin = false;
    res.clearCookie('userdata'); 
    res.redirect('/');
});

app.get('/addstuff', (req,res)=>{
    if(req.session.loggedin){
        res.sendFile('/public/pages/addstuff.html', {'root': './'});
    }else{
        res.redirect('/');
    }
});

app.get('/selectmachine', (req,res)=>{
    if(req.session.loggedin){
        res.sendFile('/public/pages/selection.html', {'root': './'});
    }else{
        res.redirect('/');
    }
});

app.use('/login', require('./Routes/login'));
app.use('/tnetadmin', require('./Routes/tnetadmin'));
app.use('/dashboard', require('./Routes/dashboard'));
app.use('/user', require('./Routes/user'));
app.use('/factories', require('./Routes/factories'));
app.use('/shopfloors', require('./Routes/shopfloors'));
app.use('/machines', require('./Routes/machines'));

app.listen(process.env.PORT || 3000, function(){
    console.log('Your node js server is running');
});