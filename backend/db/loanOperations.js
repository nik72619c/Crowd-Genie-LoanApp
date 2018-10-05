const Users=require('./schema/userSchema');
var loanOperations= {

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
                    response.json({
                        content: content
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

                           response.json({
                               status: 200,
                               responseText: 'added successfully'
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