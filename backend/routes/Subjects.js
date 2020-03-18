const router = require('express').Router();
const Subject = require('../models/subject.model');





/**********GETallSubjects***********/
router.route('/Getall').get((req, res) => {
    Subject.find().then(subject => res.json(subject)).catch(err => res.status(400).json('Error:' + err));
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
    Subject.findOne({ title: title, description: description }).then(subject => {
        if (subject) {
            console.log('subject exists');
            res.status(409).json('subject exists')

        }
        else {
            const newsubject = new Subject({
                title,
                description,
                extra,
                date,
                views
            });
            newsubject.save().then(() => res.status(200).json('subject added')).catch(err => res.status(400).json('Error:' + err))
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


module.exports = router;