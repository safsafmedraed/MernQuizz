const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentModel = new Schema({
    Comment: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        default: Date.now
    },
    userResponse: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },

})



const Comment = mongoose.model('Comment', CommentModel);
module.exports = Comment;