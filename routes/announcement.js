
const {Announcement, validate} = require('../models/Announcement');
const Express = require('express');
const router = Express.Router();


router.get('/', async (req, res) => {
    const anncmnts = await Announcement.find();
    if (!anncmnts)
        res.status(404).send("No announcements found");

    res.send(anncmnts);
});

router.get('/:id', async (req, res) => {
    const anncmnt = await Announcement.findById(req.params.id);
    if (!anncmnt)
        res.status(404).send('Announcement with given id not found');

    res.send(anncmnt);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let announcement = new Announcement(
    { 
        title: req.body.title,
        body: req.body.body,
        createTime: req.body.createTime,
        lastEdited: req.body.lastEdited,
    }
    );
    
    announcement = await Announcement.save();

    res.send(announcement);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let updatedAnncmnt = await Announcement.findById(req.params.id);
    if (!updatedAnncmnt)
        res.status(400).send('Annoucement with given id not found');

    updatedAnncmnt.set({
        title: req.body.title,
        body: req.body.body,
        lastEdited: req.body.lastEdited,
    });

    await updatedAnncmnt.save();

    res.send(updatedTeacher);
});

router.delete('/:id', async (req, res) => {
    const deletedTeacher = await findByIdAndRemove(req.params.id);
    if (!deletedTeacher)
        res.status(404).send('Teacher was not found');

    res.send(deletedTeacher);
})
module.exports = router; 