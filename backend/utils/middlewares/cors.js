const cors= (request,response,next)=>{

    console.log('response gg', response);

    response.header("Access-Control-Allow-Origin", "http://localhost:3000");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    request.header('Access-Control-Allow-Credentials',true);
    next();
}

module.exports=cors;