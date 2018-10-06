const Users=require('./schema/userSchema');
var loanOperations= {

    newLoan(loanObject,request,response){

        console.log('loanObject received', loanObject);
        Users.find({"email":loanObject.email},(err,content)=>{

            if(err){
                response.json({
                    error:err,
                    responseText: 'error finding the loan data for customer'
                });
            }

            else if(content && content.length>0){

                console.log('content is', content);
                response.json({
                    data: content
                });

            }

            else{

                response.json({
                    responseText: 'some other error occured'
                });
            }
        });
    },

    loginUser(userObject,request,response){

        console.log('userObject obtained at backend',userObject);
        Users.find({"email": userObject.email,"password": userObject.password,"role":userObject.role},(err,content)=>{     
            if(err){
                response.json({
                    error: err,
                    responseText: 'error occured in finding user'
                });
            }

                else if(content && content.length>0){
                    let userData=content;
                    console.log('content is', userData);
                    request.session.email=content[0].email;
            request.session.save(err=>{

                if(err){
                    console.log('error saving the session...');
                    response.json({
                        error: err,
                        responseText: 'error saving the session',
                        status: 500
                    });
                }

                else {

                    console.log('session saved successfully..');
                    
                console.log('session created');
                console.log('request.session ', request.session);
          
                    response.json({
                        content: content,
                        sessionID: request.sessionID,
                        
                    });
                }
            });

                }

                else if(content.length==0 || content==[]){
                    //email not present
                    console.log('email not present');
                    var user =new Users({

                        'email': userObject.email,
                        'password': userObject.password,
                        'role': userObject.role

                    });

                    user.save((err)=>{
                        if(err){
                            console.log('error occured in registering');
                            response.json({
                               status: 403
                            });
                        }

                        else{

             request.session.email=userObject.email;
            request.session.save(err=>{

                if(err){
                    console.log('error saving the session...');
                    response.json({
                        error: err,
                        responseText: 'error saving the session'
                    });
                }

                else {

                    console.log('session saved successfully..');
                }
            });

                response.json({

                   content: content,
                    sessionID: request.sessionID,
                    responseText: 'added'
                });
                       
                        }
                    });
             
                }

                else{

                    response.json({

                        status: 404,
                        responseText: 'inside the else of fetching user request'
                    });
                }
        });

    }
}

module.exports=loanOperations;