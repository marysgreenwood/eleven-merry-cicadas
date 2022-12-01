//GET /api/notes should read the db.json file and return all saved notes as JSON

//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 

//You'll need to find a way to give each note a unique id when it's saved using uuid

//DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file