module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/blog', {
        useNewUrlParser: true
    },err=>{
        if(err){
            console.error('连接失败'+JSON.stringify(err))
        }
    })
}