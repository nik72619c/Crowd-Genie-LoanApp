const cors=(request,response,next)=>{

    response.header("Access-Control-Allow-Origin", "http://localhost:4200");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    request.header('Access-Control-Allow-Credentials',true);
    next();
}

module.exports=cors;