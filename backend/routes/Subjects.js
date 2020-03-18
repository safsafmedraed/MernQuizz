const router = require('express').Router();
const Subject = require('../models/subject.model');
const User = require('../models/user.model');
const Comment = require('../models/Comments.model');




/**********GETallSubjects***********/
router.route('/Getall').get((req, res) => {
    Subject.find().then(subject => res.json(subject)).catch(err => res.status(400).json('Error:' + err));
})
/**********GETComments***********/
router.route('/GetallC').get((req, res) => {
    Comment.find().then(comment => res.json(comment)).catch(err => res.status(400).json('Error:' + err));
})
/**********Find subject by id *********** */
router.route('/Get/:id').get((req, res) => {
    Subject.findById(req.params.id).then(subject => res.json(subject)).catch(err => res.status(400).json('Error:' + err));

})

/****************Add Subject***************/
router.route('/Add').post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const extra = req.body.extra;
    const date = req.body.date;
    const views = req.body.views;
    const users = req.body.users
    Subject.findOne({ title: title, description: description }).then(subject => {
        if (subject) {
            console.log('subject exists');
            res.status(409).json('subject exists')

        }
        else {
            User.findById(req.body.users, (user) => {

                const newsubject = new Subject({
                    title,
                    description,
                    extra,
                    date,
                    views,
                    users
                });
                console.log(users);
                newsubject.save().then(() => res.status(200).json('subject added')).catch(err => res.status(400).json('Error:' + err))
            })

        }
    });
})

/************Update subject************ */
router.route('/update/:id').put((req, res) => {

    Subject.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, subject) => {
        if (err) {
            return json.status(500).json("error while updating");
        }
        else {
            res.json("update succesfull");
            return res.send();
        }
    })



})
/****************Add Comment***************/
router.route('/AddC').post((req, res) => {
    const comment = req.body.Comment;
    const date = req.body.date;
    const userResponse = req.body.userResponse;
    User.findById(req.body.users, (user) => {
        const newComment = new Comment({
            comment,
            date,
            userResponse
        });
        newComment.save().then(() => res.status(200).json('Comment added')).catch(err => res.status(400).json('Error:' + err))
    })
});
/************AffectCommentToSubject*******************/


module.exports = router;