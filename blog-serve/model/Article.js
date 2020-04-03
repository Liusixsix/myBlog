const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {//文章标题
        type: String,
        require: true
    },
    Category: {//分类
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    },
    Browse: {//浏览量
        type: Number,
        default: 0
    },
    content: {//文字内容
        type: String,
        default: ''
    },
    tag: { //标签
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Tags'
    }
}, {
    timestamps: { createdAt: 'created', updatedAt: 'updated' }
})
module.exports = mongoose.model('Article', schema, 'Article')