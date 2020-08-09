const express = require('express');
const messagesController = require('../controllers/messages');


// Setting up your router mini express app
const router = express.Router();

// this router should mainly deside three things
// 1- the method
// 2- path
// middleware to be invoked




// routes ENDPOINTS

//  GET /messages/get

router.get('/get', messagesController.getAllMessages);

// POST /message/post

router.post('/post', messagesController.postMessage);

// DELETE /messages/delete

router.delete('/delete', messagesController.deleteMassege);


// PATCH /messages/patch

router.patch('/patch', messagesController.updateMessage);




// exporting the express router
module.exports = router;