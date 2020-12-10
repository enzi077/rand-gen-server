const express=require('express')
const router=express.Router()
const passport = require("passport");

//login handle
router.post('/',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect: 'http://localhost:3000/para',
        failureRedirect: 'http://localhost:3000/user/login',
        failureFlash: true
    })(req,res,next)
})

module.exports=router