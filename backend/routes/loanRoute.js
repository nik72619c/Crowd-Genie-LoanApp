const express=require('express');
var loanRoute= express.Router();
const cors=require('cors');
const loanOperations=require('../db/loanOperations');
const sessionChecker=require('../utils/middlewares/sessionChecker');

//testing if backend is working
// loanRoute.get('/',(request,response)=>{
//     response.json({
//         message: "working smooth"
//     });
// });

loanRoute.post('/loginUser',(request,response)=>{
console.log('request.header',request.headers);
    let userObj=request.body.userObject;
    loanOperations.loginUser(userObj,request,response);

});
//testing the sessionChecker middleware here
loanRoute.post('/test',(request,response)=>{
    console.log('request.header',request.headers);
    response.json({
        content: request.body,
        sessionFromBackend: request.session,
        
    });

});

loanRoute.get('/newLoan',(request,response)=>{

    var loanObject={
        email: request.param('email'),
        sessionId: request.param('sessionId')
    };
    loanOperations.newLoan(loanObject,request,response);

});

module.exports=loanRoute;