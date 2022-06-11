var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3')

router.get('/', function(req, res, next) {

    if(req.authorized){

        var db = new sqlite3.Database('notes.db');
        let query = `SELECT Login FROM Users WHERE Id=${req.user_id}`;
        db.all(query, (err, rows) => {
           const user_login = rows[0].Login;
           res.render('notes_list', {user: user_login});
        });

    }else{
        req.status = 403;
        res.redirect('/users/login');
    }
});

router.get('/create', (req, res) => {
    res.render('create_note', {});
});

router.post('/create', (req, res) => {

    var db = new sqlite3.Database('notes.db');

    let note_title = req.body.title;
    let note_text = req.body.text;
    let note_tags = req.body.tags;

    let query =`INSERT INTO Notes(Title, Text, Tags, "User ID") VALUES("${note_title}", "${note_text}", "${note_tags}", "${req.user_id}")`;
    console.log(query);

    db.run(query);

    // res.send("New note saved.");
    res.redirect('/notes');
});

module.exports = router;
