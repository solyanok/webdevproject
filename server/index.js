const express = require('express');
const app = express()
const port = 6000
mongoose = require ('mongoose')
require('dotenv').config()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });