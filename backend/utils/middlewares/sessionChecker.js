var sessionChecker= ( request , response , next )=> {
console.log('gg', request.body);
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
    store.get(request.body.sessionId,(err,session)=>{
        if(err){
            console.log('err');
            response.json({
                isAuth: false
            });
        }
        else{

         next();
        }
    });

};

module.exports=sessionChecker;