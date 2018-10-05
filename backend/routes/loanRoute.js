const express=require('express');
var loanRoute= express.Router();
const cors=require('../utils/middlewares/cors');
const loanOperations=require('../db/loanOperations');

//testin if backend is working
// loanRoute.get('/',(request,response)=>{
//     response.json({
//         message: "working smooth"
//     });
// });

loanRoute.post('/loginUser',cors,(request,response)=>{

    let userObj=request.body.userObject;
    loanOperations.loginUser(userObj,request,response);

});

module.exports=loanRoute;