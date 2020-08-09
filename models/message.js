const fs = require('fs');
const path = require('path');

// local requries
const rootdir = require('../util/path');

const data = require('../data/messages');



module.exports = class Message {

    constructor(author, id, specialCase, message) {

        this.author = author;
        this.id = id;
        this.specialCase = specialCase;
        this.message = message;
        if (specialCase) {
            this.palindrome = Message.isPalindromeSpecial(message);
        } else {
            this.palindrome = Message.isPalindrome(message);
        }

    }

    // this methods considers if there is a special case in
    static isPalindromeSpecial(msg) {
        // first check if its an empty message
        if (!msg) {
            return true;
        }
        // setting it to lower case
        let lowMsg = msg.toLowerCase()

        let start = 0;
        let end = msg.length - 1;
        while (start < end) {
            // check if start is a special char 
            // (is a letter or is a number)
            if (msg[start].toUpperCase() === msg[start].toLowerCase() && !(msg[start] >= '0' && msg[start] <= '9')) {
                start++;
            } else if (msg[end].toUpperCase() === msg[end].toLowerCase() && !(msg[end] >= '0' && msg[end] <= '9')) {
                end--;
            } else {
                if (msg[start].toLowerCase() != msg[end].toLowerCase()) {
                    return false
                }
                start++;
                end--;
            }

        }
        return true
    }

    static isPalindrome(msg) {
        if (!msg) {
            return true;
        }
        return msg === reverse(msg);
    }


    save() {
        const p = path.join(rootdir, 'data', 'messages.json');
        let messages = [];
        // no need to require JSON it already a utility in vanilla node.js
        // reading the file in the path p to the filecontent variable
        fs.readFile(p, (err, filecontent) => {

            // if not empty 
            if (!err) {
                messages = JSON.parse(filecontent);

            }
            messages.push(this);
            fs.writeFile(p, JSON.stringify(messages), (err) => { console.log(err) });
        });



    }

    static fetchALL(cb, author = null, id = null) {
        const p = path.join(rootdir, 'data', 'messages.json');
        fs.readFile(p, (err, filecontent) => {
            let messages = [];
            // if not empty 
            if (!err) {

                messages = JSON.parse(filecontent);
                if (!messages.length) {
                    console.log("no data in storage");
                    return cb(false);
                }

                if (author) {
                    messages = messages.filter((messages) => {
                        return messages.author === author;
                    })
                }
                if (id) {
                    messages = messages.filter((messages) => {
                        return messages.id === id;
                    });
                }



            } else {
                console.log(err);
            }
            cb(messages);
        });
    }





    static delete(author = null, id = null, cb) {
        const p = path.join(rootdir, 'data', 'messages.json');
        fs.readFile(p, (err, filecontent) => {
            let messages = [];

            // if not empty 
            if (!err) {

                messages = JSON.parse(filecontent);


                if (author) {
                    messages = messages.filter((messages) => {
                        return messages.author != author;

                    })

                } else if (id) {

                    messages = messages.filter((messages) => {
                        return messages.id != id;
                    });

                }



            } else {
                console.log(err);
            }



            fs.writeFile(p, JSON.stringify(messages), (err) => { console.log(err) });
            cb(true);




        });
    }





    static update(id, message = null, specialCase = null, cb) {
        const p = path.join(rootdir, 'data', 'messages.json');
        fs.readFile(p, (err, filecontent) => {
            let messages = [];


            if (!err) {
                messages = JSON.parse(filecontent);

            }
            // this is no data in storage check
            if (!messages.length) {
                console.log("no data in storage");
                return cb(false);
            }
            let done = false;
            let index = 0;
            while (!done) {
                if (messages[index].id === id) {
                    if (message) {
                        messages[index].message = message;
                    }
                    if (specialCase) {
                        messages[index].specialCase = specialCase;
                    }
                    if (messages[index].specialCase) {
                        messages[index].palindrome = Message.isPalindromeSpecial(messages[index].message);
                    } else {
                        messages[index].palindrome = Message.isPalindrome(messages[index].message);
                    }
                    done = true;
                } else {
                    index++;
                }

            }

            fs.writeFile(p, JSON.stringify(messages), (err) => { console.log(err) });
            cb(true);

        });
    }


}








function reverse(msg) {
    return msg.split('').reverse().join('');


}