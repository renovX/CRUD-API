const express=require('express')
const slz=require('./util/database')
const app=express();
const bodyParser=require('body-parser')
const crudRoutes=require('./routes/crud')

let port=process.env.PORT||3000
app.use(bodyParser.urlencoded({ extended: false }));
app.get((req,res,next)=>
{
    res.send("Welcome");
    next()
})
app.use('/crudapi',crudRoutes);
app.use((req,res,next)=>
{
    res.statusCode=404
    res.send("invalid url");
})
slz.sync().
then(()=>{

    app.listen(port,()=>{console.log("Listening on Port: "+port)})
})
