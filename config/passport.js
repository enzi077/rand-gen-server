const LocalStrategy=require('passport-local').Strategy
const mongoose=require('mongoose')
const bycrypt=require('bcryptjs')
const User=require('../models/User')

module.exports=(passport)=>{
    passport.use(
        new LocalStrategy({ usernameField: 'username'},(username,password,done)=>{
            //match user
            User.findOne({username: username})
                .then(user=>{
                    if(!user){
                        return done(null,false,{message: "That username is invalid"})
                    }
                    
                    // match password
                    bycrypt.compare(password,user.password,(error,isMatch)=>{
                        if(error) throw error
                        if(isMatch){
                            return done(null,user)
                        }else{
                            return done(null,false,{message:'password incorrect'})
                        }
                    })
                })
                .catch(err=>console.log(err))
        })
    )
    
    passport.serializeUser((user, done)=> {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user)=> {
            done(err, user);
        });
    });
}