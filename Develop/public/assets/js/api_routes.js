const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// GET /api/notes route
app.get('../notes', (req, res) => {
  try {
    // Read the db.json file
    const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');

    // Parse the JSON data
    const notes = JSON.parse(data);

    // Return the notes as JSON
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read notes from the database.' });
  }
});

// POST /api/notes route
app.post('../notes', (req, res) => {
  try {
    // Read the db.json file
    const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');

    // Parse the JSON data
    const notes = JSON.parse(data);

    // Generate a unique ID for the new note
    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };

    // Add the new note to the array of notes
    notes.push(newNote);

    // Write the updated notes array to the db.json file
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notes));

    // Return the new note as JSON
    res.json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save the new note to the database.' });
  }
});