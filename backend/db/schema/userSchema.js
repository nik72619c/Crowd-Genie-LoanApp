const mongoose= require('../common/connection');
const schema = mongoose.Schema;
var userSchema= new schema({

    "email": String,
    "password": String,
    "role": String
    // "loans": [{
    //     "loanid": Number,
    // "amount": Number,
    // "status": String,
    // "description": String

    // }]
});

var userModel=mongoose.model('users',userSchema);
module.exports=userModel;