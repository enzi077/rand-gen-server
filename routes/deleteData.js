const express=require('express')
const Data=require('../models/SubmitData')
const router=express()

router.delete('/',async(req,res)=>{
    try {
        const removedData=await Data.remove({})
        res.sendStatus(200).json(removedData)
    } catch (error) {
        res.sendStatus(404).json({message:error})
    }
})

module.exports=router