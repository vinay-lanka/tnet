/* Tnet Server Backend - developed by vinay-lanka 
This is the main server script that uses the express framework
Other routes are managed by the express router in the Routes folder.*/

//Requiring modules
var express = require('express');
var session = require('express-session');
// var RedisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//Experimented with redis - a easy to use datastore for sessions

// if (process.env.REDISTOGO_URL) {
//     var rtg   = require("url").parse(process.env.REDISTOGO_URL);
//     var redis = require("redis").createClient(rtg.port, rtg.hostname);
//     var redisAuth = redis.auth(rtg.auth.split(":")[1]);
// } else {
//     var redis = require("redis").createClient();
// }

var app = express();                //Creating an express app
// require('dotenv').config();
app.use(cookieParser());            //Use cookie parser for setting cookies
app.use(session({                   //Session management for each user
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
app.use(express.static(__dirname + '/public/'));        //Using the directory to serve up static assets
app.use(bodyParser.urlencoded({extended : true}));      //Using the body-parser for reading the body of requests to server
app.use(bodyParser.json());                             //For JSON format

app.get('/', (req,res)=>{                               //Default Route '/' Checks if logged in and redirects accordingly
    // console.log(res.status);
    if(req.session.loggedin){
        res.redirect('/dashboard');
    }else{
        res.redirect('/login');
    }
});

app.get('/logout', (req,res)=>{                         //Logout route. Clears cookies and resets session variables and redirects to '/'
    req.session.loggedin = false;
    res.clearCookie('userdata'); 
    res.clearCookie('macdata');
    res.redirect('/');
});

app.get('/addstuff', (req,res)=>{                       //Route to the page to add things - addstuff.html. Doesn't fit in any specific route so added it here
    if(req.session.loggedin){
        res.sendFile('/public/pages/addstuff.html', {'root': './'});
    }else{
        res.redirect('/');
    }
});

app.get('/selectmachine', (req,res)=>{                  // Route to the page to select machines - select.html. Doesn't fit in any page so added it here
    if(req.session.loggedin){
        res.sendFile('/public/pages/selection.html', {'root': './'});
    }else{
        res.redirect('/');
    }
});

/*Declearing routes for each page
The files for the routes are stored in the Routes subfolder*/

app.use('/login', require('./Routes/login'));
app.use('/tnetadmin', require('./Routes/tnetadmin'));
app.use('/dashboard', require('./Routes/dashboard'));
app.use('/analytics', require('./Routes/analytics'));
app.use('/user', require('./Routes/user'));
app.use('/factories', require('./Routes/factories'));
app.use('/shopfloors', require('./Routes/shopfloors'));
app.use('/machines', require('./Routes/machines'));


//The app listens to connections on this port. If no port is specified by the env, it uses the default 3000 port.
app.listen(process.env.PORT || 3000, function(){
    console.log('Your node js server is running');
});