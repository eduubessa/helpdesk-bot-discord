const mongoose = require('mongoose');
const app = require('../Config/app');
const mongodb = require('../Config/database');

let connection = null;

if(app.debug === true){
    mongoose.set('useNewUrlParser', mongodb.development.options.useNewUrlParser);
    mongoose.set('useFindAndModify', mongodb.development.options.useFindAndModify);
    mongoose.set('useCreateIndex', mongodb.development.options.useCreateIndex);
    mongoose.set('useUnifiedTopology', mongodb.development.options.useUnifiedTopology);

    console.log(`Database is connected to your application!`);

    if(mongodb.development.auth === true) {
        connection = mongoose.connect(`${mongodb.development.driver}+srv://${mongodb.development.username}:${mongodb.development.password}@${mongodb.development.host}/${mongodb.development.index}?retryWrites=true&w=majority`);
    }else {
        connection = mongoose.connect(`${mongodb.development.driver}+srv://${mongodb.development.host}/${mongodb.development.index}?retryWrites=true&w=majority`);
    }
}else{
    mongoose.set('useNewUrlParser', mongodb.production.options.useNewUrlParser);
    mongoose.set('useFindAndModify', mongodb.production.options.useFindAndModify);
    mongoose.set('useCreateIndex', mongodb.production.options.useCreateIndex);
    mongoose.set('useUnifiedTopology', mongodb.development.options.useUnifiedTopology);

    if(mongodb.production.auth == true) {
        connection = mongoose.connect(`${mongodb.production.driver}+srv://${mongodb.production.username}:${mongodb.production.password}@${mongodb.production.host}/${mongodb.production.index}?retryWrites=true&w=majority`);
    }else{
        connection = mongoose.connect(`${mongodb.production.driver}+srv://${mongodb.production.host}:${mongodb.production.port}/${mongodb.production.index}?retryWrites=true&w=majority`);
    }
}

module.exports = connection;
