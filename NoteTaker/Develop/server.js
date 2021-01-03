const express = require('express');
const path = require('path');
const tmpdb = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');
const fs  = require('fs');

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// GET /api/notes should read the db.json file 
// and return all saved notes as JSON.

app.get('/api/notes', (req,res) => res.json(tmpdb));

// /POST /api/notes should receive a new note to save on the 
// request body, add it to the db.json file, 
// and then return the new note to the client. You'll need to 
// find a way to give each note a unique id when 
// it's saved (look into npm packages that could do this 
// for you).
app.post('/api/notes', (req,res) => {
    
    // console.log("req::::" + JSON.stringify(req.body));
   
    let id = uuidv4();
    let newNote = {...req.body,id:id};
   
    const outputPath = path.join(__dirname, './db/db.json');


    tmpdb.push(newNote);
     fs.writeFile(outputPath, JSON.stringify(tmpdb) , (err) => {
        if (err) throw err;
        // console.log(tmpdb)
        res.json(tmpdb);

      });
    

    // TODO: 1. Update tempdb with req.body and id
    // res.end( req.body );
    // 2. rewrite db.json with the tempdb
    // res.json the tempdb
    
})

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));