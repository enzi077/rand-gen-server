const mongoose=require('mongoose')

const paraSchema=mongoose.Schema({
    description:{
        type: String,
        required: true
    }
})

module.exports=mongoose.model('Para',paraSchema)