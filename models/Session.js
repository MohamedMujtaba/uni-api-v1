const mongoose = require('mongoose')


const SessionSchema = mongoose.Schema({
    name:{type:String,require:true},
    arr:{type:Array,default:[]}
})

module.exports = mongoose.model('Session',SessionSchema)