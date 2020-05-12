const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    Article: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }
    ]
}, {
    timestamps: { createdAt: 'created', updatedAt: 'updated' }
})

module.exports = mongoose.model('Category', schema)