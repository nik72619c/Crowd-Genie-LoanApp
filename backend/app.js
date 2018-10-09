const express=require('express');
const app=express();
// const cors=require('./utils/middlewares/cors');
const bodyParser= require('body-parser');
const session=require('express-session');
const loanRoute=require('./routes/loanRoute');
const path= require('path');
// const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
app.use(bodyParser.json());

// app.use(cors({
//    origin: 'http://localhost:3000',
//     credentials: true

// }));

app.use(function(req, res, next) {
    console.log('inside the cors middleware');
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials','true');
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Cache-Control", "no-cache");
    next();
});

const store=require('./utils/sessionstore');
app.use(session({
store : store,
    secret: 'nik',
    resave: false,
    saveUninitialized: true,
    cookie: {

        httpOnly: false,
        secure: false,
        maxAge: 1000*60*5
    }

}));

app.use('/',loanRoute);
// app.use('products',productRoute);

//serve static assets if in production mode

if(process.env.NODE_ENV=='production'){

    //set static asset folder
    app.use(express.static('loan_app/build'));
    app.get('*', (req,res)=>{

        res.sendFile(path.resolve(__dirname,'loan_app', 'build','index.html'));
    })
}


var port =process.env.PORT || 1234;
app.listen(port,()=>{
    process.stdout.write('server started on port '+port);
    
});
