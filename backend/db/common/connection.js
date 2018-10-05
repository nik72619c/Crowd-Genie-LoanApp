const mongoose=require('mongoose');
mongoose.connect('mongodb://nik72619c:nikhil1997@ds121753.mlab.com:21753/loan',()=>{

console.log("successfully connected to the databse...");
});

module.exports=mongoose;