const router = require('express').Router();
const Comment = require('../models/Comments.model');

/****************Add Subject***************/
router.route('/Add').post((req, res) => {
    const comment = req.body.comment;
    const date = req.body.date;


    const newComment = new Comment({
        title,
        description,
        extra,
        date,
        views
    });
    newsubject.save().then(() => res.status(200).json('Comment added')).catch(err => res.status(400).json('Error:' + err))
})






module.exports = router;