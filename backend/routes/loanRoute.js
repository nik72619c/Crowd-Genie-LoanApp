const express=require('express');
var loanRoute= express.Router();
const cors=require('../utils/middlewares/cors');

//testin if backend is working
// loanRoute.get('/',(request,response)=>{
//     response.json({
//         message: "working smooth"
//     });
// });

loanRoute.post('/loginUser',cors,(request,response)=>{

    let userObject=request.body.userObject;
    console.log('userObject received is',userObject);
    response.json({
        text:"gg"
    })
});

module.exports=loanRoute;