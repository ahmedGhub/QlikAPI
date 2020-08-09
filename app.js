const express = require('express');
const bodyParser = require('body-parser');

// local requires
const messagesRoutes = require('./routes/messages');
const messagesController = require('./controllers/messages');




const app = express()

// Set up main standards regarding Http connection and the body parser.

app.use(bodyParser.json());





app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
})



// Routing Early separations
app.use('/messages', messagesRoutes);





// listing at
app.listen(4444);

module.exports = app;