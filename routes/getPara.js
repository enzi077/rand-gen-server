const express=require('express')
const Para=require('../models/IntroPara')
const router=express.Router()

router.get('/',async(req,res)=>{
    try {
        const introPara=await Para.find()
        res.status(200).json(introPara)
    } catch (error) {
        res.status(404).json({message: error})
    }
})

router.post('/',async(req,res)=>{
    const para=new Para({
        description: req.body.description
    })
    
    try {
        await Para.findOne({description: req.body.description},(err,found)=>{
            if(err){
                res.redirect('/para')
            }
            
            para.save()
            res.redirect('/user/login')
        })
    } catch (error) {
        res.sendStatus(404).json({message: error})
    }
})

router.patch('/:id',async(req,res)=>{
    try {
        const updated=await Para.updateOne(
            {_id:req.params.id},
            {$set: {description: req.body.description}}
        )
        res.sendStatus(200).json({message: OK})
    } catch (error) {
        res.sendStatus(404).json({message: error})
    }
})

module.exports=router