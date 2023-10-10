const express = require('express');
const app = express()
const port = 4040
mongoose = require ('mongoose')
require('dotenv').config()
const path = require('path');

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(require('cors')())

async function connecting(){
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('Connected to the DB')
    } catch ( error ) {
        console.log('ERROR: Seems like your DB is not running, please start it up !!!');
    }
}
connecting()

app.use('/boards', require('./routes/boardsRoutes'))
app.use('/user', require('./routes/userRoutes'))
app.use('/tasks', require('./routes/tasksRoutes'))

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });