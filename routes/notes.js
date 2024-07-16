const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile, readAndAppend } = require('../helper/fsUtils');

  //get all notes
notes.get('/', (req, res) => {
   readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
  
  //get single note
notes.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
      ? res.json(result)
      : res.json('No note with that ID');
    });
  });
  
//delete post
notes.delete('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
  .then((data) => JSON.parse(data))
  .then((json) => {
    const result = json.filter((note) => note.note_id !== noteId);
    writeToFile('./db/db.json', result);
    res.json('Note ${noteId} has been deleted');
  });
});

//create new post
notes.post('/', (req, res) => {
   console.log(req.body);

    const { title, text } = req.body;

     if (req.body) {
      const newNote ={
        title,
        text,
        note_id: uuidv4(),
      };

    readAndAppend(newNote, './db/db.json');

    res.json('Note added!');
  } else {
    res.error('Error when note added');
  }
  });


module.exports = notes;