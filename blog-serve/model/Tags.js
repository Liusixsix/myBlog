const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: { //标签名
        type: String,
    }
})


module.exports = mongoose.model('Tags', schema, 'Tags')