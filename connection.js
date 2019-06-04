var mysql = require('mysql2');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'tnetdatabase'
});
// var connection = mysql.createConnection('mysql://baabc10c17a25e:c94d6bce@us-cdbr-iron-east-02.cleardb.net/heroku_e46341c9bbd6fae?reconnect=true');

var db;
function connectDatabase() {
    if (!db) {
        db = connection;

        db.connect(function(err){
            if(!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
            }
        });
    }
    return db;
}

module.exports = connectDatabase();