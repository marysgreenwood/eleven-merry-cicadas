//require necessary modules/dependencies
const util= require('util');
const fs= require('fs');
const { v1: uuidv1 } = require('uuid')

//instantiates functionality to read and write files and return a promise
const readFileAsync= util.promisify(fs.readFile);
const writeFileAsync= util.promisify(fs.writeFile);

class Store {
    //reads db.json file
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }
    //writes updated notes to db.json file
    write (note){
        return writeFileAsync('db/db.json', JSON.stringify (note));
    }
    //calls read() function and uses callback function to parse data retrieved from db.json
    getNotes(){
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes=[].concat(JSON.parse(notes));
            } catch (err){
                parsedNotes= [];
            }
            return parsedNotes;
        });
    }
    
    //takes in new note
    addNote(note){
        const {title, text}=note;
        //send error message if no text is entered
        if (!title || !text) {
            throw new Error ("Note 'title' and 'text' cannot be blank")
        }
        //create newNote object and add unique id to the note using uuid
        const newNote= {title, text, id: uuidv1()};

        //add new note to existing 
        return this.getNotes()
        .then((notes) => [...notes, newNote])
        //write updated notes to db.json
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
    }
    //takes in id of note to be removed and removes that note from the array
    removeNote(id) {
        return this.getNotes()
        .then((notes)=> notes.filter((note) => note.id !==id))
        .then((filteredNotes) => this.write(filteredNotes));
    }
};
//exports Store class for use in apiRoutes.js
module.exports= new Store();