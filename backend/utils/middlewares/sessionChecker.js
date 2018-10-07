var sessionChecker= ( request , response , next )=> {

    // console.log('request inside the sessionChecker...');
    // console.log(request.method);
    // console.log('request.body.sessionId',request.body.sessionId);
    // console.log('request.sessionID',request.sessionID);
    // if(request.session && request.session.email){
    //     console.log('inside if 1...');
    //    if(request.method=='POST'){
    //        console.log('request.body inside the sessioonChecjker is',request.body);
    //        console.log('request.body.sessionId',request.body.sessionId);
    //        console.log('request.sessionID',request.sessionID);
    //        if(request.body.sessionId==request.sessionID){
    //            console.log('inside the if of sessionChecker..');
    //            next();
    //        }
    //        else{
    //            response.json({
    //                status: 403,
    //             responseText: 'session not found',
    //             isSessionPresent: false
    //             });
    //        }

    //    }

    //  if(request.method=='GET'){

    //     console.log('inside the get condition of the sessionChecker..');
    //     console.log('inside get request of sessionChecker...',request.params);
    //      next();
        
    //    }

    
    // }

    // else{
    //     console.log('inside the else codition of the sessionChecker....gg');
    //    response.json({
    //        status: 403,
    //        responseText: 'session not found'
    //    });

    // 
    const store=require('../sessionstore');
    console.log('req.body.sessionId inside middleware',request.body.sessionId);
    if(request.method=='POST'){
        console.log('sessionChecker got the post request.');
    store.get(request.body.sessionId,(err,session)=>{
        if(err){
            console.log('err');
            response.json({
                isAuth: false
            });
        }

        else if(!session){

            console.log('inside the else if of the sessionChecker..');
            response.json({
                isAuth: false
            });
            
        }
        else{

        console.log('inside else of sessionChecker..');
         next();
        }
    });

}

else{

    console.log('sessionChecker got the get request...');
    store.get(request.param('sessionId'),(err,session)=>{
        if(err){
            console.log('err');
            response.json({
                isAuth: false
            });
        }

        else if(!session){

            console.log('inside the else if of the sessionChecker..');
            
            response.json({
                isAuth: false
            });
            
        }
        else{

        console.log('inside else of sessionChecker..');
        console.log('sessionId inside the sessionChecker is', request.param('sessionId'));
         next();
        }
    });


}

};

module.exports=sessionChecker;