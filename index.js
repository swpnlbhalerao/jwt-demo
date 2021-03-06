const  express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv =require('dotenv');

dotenv.config();

//connec to db
mongoose.connect(process.env.Db_Connect,
{ useNewUrlParser: true },(error)=>{
    if(!error)
    console.log("Connected Successfully");
    else
    console.log("Error message "+error.message);
}); 

//bodyparse
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Import toutes
const authRoutes=require('./routes/auth');
const postRoutes=require('./routes/post')

//route middleware
app.use('/api/user',authRoutes);
app.use('/api/posts',postRoutes);





app.listen(5000,()=>{
    console.log('Server up and running on port 5000');
})