const router= require ('express').Router();
const store = require ('../db/store');

//GET /api/notes should read the db.json file and return all saved notes as JSON
router.get ('/notes', (req, res) => {
    store
    .getNotes()
    .then((notes) => {
        return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 

router.post('/notes', (req, res) => {
    store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

//DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file

router.delete ('/notes/:id', (req, res) => {
    store
    .removeNote(req.params.id)
    .then(() => res.json({ok:true}))
    .catch((err) => res.status(500).json(err));
});

module.exports=router;