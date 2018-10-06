const sessionstore=require('sessionstore');

var store=sessionstore.createSessionStore({

    type: 'mongodb',
        host: 'localhost',         // optional
        port: 27017,               // optional
        dbName: 'loan',            // optional
        collectionName: 'sessions',// optional
        timeout: 10000,
        url: 'mongodb://nik72619c:nikhil1997@ds121753.mlab.com:21753/loan'
});



module.exports=store;