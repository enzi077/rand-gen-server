const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
require('dotenv/config')
const submitData=require('./routes/submitData')
const getData=require('./routes/getData')
const deleteData= require('./routes/deleteData')
const getPara=require('./routes/getPara')
const user=require('./routes/user')
const passport = require("passport");


const app=express()
require('./config/passport')(passport)

//middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());
app.use('/submit',submitData)
app.use('/get',getData)
app.use('/delete',deleteData)
app.use('/para',getPara)
app.use('/user',user)

//mongodb string
mongoose.connect(process.env.DB_CONNECTION,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    ()=>console.log("DB connected")
)

//routes
app.get('/',async(req,res)=>{
    res.redirect('https://eventregistrationform.web.app/')
})

app.get('/registered',async(req,res)=>{
    res.redirect('https://eventregistrationform.web.app/registered')
})


//listen
const PORT=process.env.PORT || 4000
app.listen(PORT,console.log(`Server started at port ${PORT}`))