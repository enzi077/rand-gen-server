const express=require('express')
const Data=require('../models/SubmitData')

const router=express.Router()

router.post('/',async(req,res)=>{
    const data=new Data({
        name: req.body.name,
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email
    })
    
    try {
        await Data.findOne({username: req.body.username},(err,found)=>{
            if(err){
                console.log(err)
                res.redirect('/')
            }
            if(found){
                console.log('already exists')
                res.redirect('/registered')
            }
            else{
                data.save()
                res.redirect('/')
            }
        })
    } catch (error) {
        res.sendStatus(404).json({message: error})
    }
})

module.exports=router