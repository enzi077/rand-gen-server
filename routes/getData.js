const express=require('express')
const Data=require('../models/SubmitData')
const router=express.Router()

router.get('/',async(req,res)=>{
    try {
        const participants=await Data.find()
        res.status(200).json(participants)
    } catch (error) {
        res.status(404).json({message: error})
    }
})

module.exports=router