
const path= require('path');
const router= require('express').Router();

//"/notes" returns the notes.html file
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
//Other routes return the index.html file

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});
//exports routes for use by server.js
module.exports = router;