const express=require('express');
const app=express();
// const cors=require('./utils/middlewares/cors');
const bodyParser= require('body-parser');
const session=require('express-session');
const loanRoute=require('./routes/loanRoute');
const cors = require('cors');


// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
app.use(express.json())


const store=require('./utils/sessionstore');
app.use(session({
store: store,
    secret: 'nik',
    resave: true,
    saveUninitialized: true,
    cookie: {

        httpOnly: false,
        secure: false,
        maxAge: 1000*60*5
    }

}));
app.use(cors());
app.use('/',loanRoute);
// app.use('products',productRoute);


var port =process.env.PORT || 1234;
app.listen(port,()=>{

    process.stdout.write('server started on port '+port);

});
