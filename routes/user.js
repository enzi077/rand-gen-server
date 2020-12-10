const express=require('express')
const router=express.Router()
const User=require('../models/User')
const cors=require('cors')
const bcrypt=require('bcryptjs')
const login=require('./login')

router.use(cors())
router.use('/login',login)

router.get('/',(req,res)=>{res.send('register')})

router.post('/register',(req,res)=>{
    const {username,password}=req.body
    const newUser=new User({
        username,
        password
    })
    
    // hash password
    bcrypt.genSalt(10,(error,salt)=>bcrypt.hash(
        newUser.password,salt,(err,hash)=>{
            if(err) throw err
            
            //set hashed password
            newUser.password=hash
            
            //save user
            newUser.save()
                    .then(user=>{
                        res.redirect('/user/login')
                    })
        }
    ))
})

router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/user/login')
})


module.exports=router