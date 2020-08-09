const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const Message = require('../models/message');






// middlewares

exports.getAllMessages = (req, res, next) => {
    let author = req.body.author;
    let id = req.body.id;
    Message.fetchALL((msg) => {
        if (msg) {
            return res.status(200).json(msg);
        } else {
            res.status(302);
            res.json({ "confirmation": "No data" });
        }
    }, author, id);

}


exports.postMessage = (req, res, next) => {


    let author = req.body.author;
    let message = req.body.message;
    let specialCase = req.body.specialCase;
    let id = Date.now();

    if (!author || !message) {
        res.status(302);
        return res.json({ "confirmation": "Not specified" });
    }

    let msg = new Message(author, id, specialCase, message);
    msg.save()


    res.status(201).json(msg);
}


exports.deleteMassege = (req, res, next) => {

    let author = req.body.author;
    let id = req.body.id;
    if (!author && !id) {
        res.status(302);
        res.json({ "confirmation": "Not specified" });
    } else {

        Message.delete(author, id, flag => {
            if (flag) {
                res.status(201);
                res.json({ "confirmation": "done" });
            } else {
                res.status(302);
                res.json({ "confirmation": "No data" });

            }

        });
    }
}



exports.updateMessage = (req, res, next) => {

    let id = req.body.id;
    let message = req.body.message;
    let specialCase = req.body.specialCase;



    if (!id || (!message && specialCase == null)) {
        res.status(302);
        res.json({ "confirmation": "Not specified" });
    } else {

        Message.update(id, message, specialCase, flag => {
            if (flag) {
                res.status(201);
                res.json({ "confirmation": "done" });
            } else {
                res.status(302);
                res.json({ "confirmation": "No data" });
            }
        })


    }
}