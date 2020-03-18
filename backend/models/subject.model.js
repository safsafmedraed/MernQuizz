const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectmodel = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    extra: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    }
});


const Subject = mongoose.model('subject', subjectmodel);
module.exports = Subject;