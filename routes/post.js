const router=require('express').Router();
const verify=require('../verifyToken');



    router.get('/',verify,(req,res)=>{
        res.send({
             posts:{
            "title":'my first post',
            "role":"admin",
            "desc":"desc not avaialble"
         }
         })

    })
    module.exports=router
