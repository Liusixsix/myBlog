const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String
    },
}, {
    timestamps: { createdAt: 'created', updatedAt: 'updated' }
})

module.exports = mongoose.model('Category', schema)