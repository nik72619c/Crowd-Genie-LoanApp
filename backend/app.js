const express=require('express');
const app=express();

const cors=require('cors');

const bodyParser= require('body-parser');
const adminRoute=require('./routes/adminroutes');
const session=require('express-session');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.get('/', (request, response)=>{

// response.send('node backend works');

// });

app.use(cors({

    origin: '*',
   
}));
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

// app.use('/',adminRoute);
// app.use('products',productRoute);


var port =process.env.PORT || 1234;
app.listen(port,()=>{

    process.stdout.write('server started on port '+port);
});
