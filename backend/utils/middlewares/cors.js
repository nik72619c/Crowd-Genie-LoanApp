var cors=function (request,response,next){

    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    request.header('Access-Control-Allow-Credentials',true);
    next();
}

module.exports=cors;