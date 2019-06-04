var express = require('express');
var session = require('express-session');
// var RedisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// if (process.env.REDISTOGO_URL) {
//     var rtg   = require("url").parse(process.env.REDISTOGO_URL);
//     var redis = require("redis").createClient(rtg.port, rtg.hostname);
//     var redisAuth = redis.auth(rtg.auth.split(":")[1]);
// } else {
//     var redis = require("redis").createClient();
// }

var app = express();
// require('dotenv').config();
app.use(cookieParser());
app.use(session({
    // store: new RedisStore({
    //     host: rtg.hostname,
    //     port: rtg.port,
    //     db: redisAuth[0],
    //     pass: redisAuth[1]
    //   }),
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
app.use('/analytics', require('./Routes/analytics'));
app.use('/user', require('./Routes/user'));
app.use('/factories', require('./Routes/factories'));
app.use('/shopfloors', require('./Routes/shopfloors'));
app.use('/machines', require('./Routes/machines'));

app.listen(process.env.PORT || 3000, function(){
    console.log('Your node js server is running');
});