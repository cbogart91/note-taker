const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/main.js');


const port = process.env.PORT || 3001;

const app = express();

app.use(clog);

// can be used in place of both 'app.get'
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api', api);

app.use(express.static('public'));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(port, () => {console.log(`PORT ${port} is active!`);
});
