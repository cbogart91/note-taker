const router = require('express').Router();

//import notes
const notesRouter = require('./notes');
router.use('/notes', notesRouter);

module.exports = router;