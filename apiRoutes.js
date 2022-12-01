const router= require ('express').Router();
const store = require ('./db/store');

//reads the db.json file and return all saved notes as JSON
router.get ('/notes', (req, res) => {
    store
    .getNotes()
    .then((notes) => {
        return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

//receives a new note to save on the request body, adds it to the db.json file, and then returns the new note to the client. 

router.post('/notes', (req, res) => {
    store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

//receives a query parameter containing the id of a note, locates and deletes identified note
router.delete ('/notes/:id', (req, res) => {
    store
    .removeNote(req.params.id)
    .then(() => res.json({ok:true}))
    .catch((err) => res.status(500).json(err));
});

//exports routes for use in server.js
module.exports=router;