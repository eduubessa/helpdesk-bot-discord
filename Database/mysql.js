const mysql     = require('mysql');
const app       = require('../Config/app');
const database   = require('../Config/database');

let connection = null;

if(app.debug === true){

    connection = mysql.createConnection({
        host: database.development.host,
        user: database.development.username,
        password: database.development.password,
        database: database.development.database
    });

    connection.connect((err) => {
        if (err) throw err;

        console.log("Connected with successfully!")
    });

}else{
    connection = mysql.createConnection({
        host: database.production.host,
        user: database.production.username,
        password: database.production.password,
        database: database.production.database
    });

    connection.connect((err) => {
        if (err) throw err;

        console.log("Connected with successfully!")
    });
}

module.exports = connection;