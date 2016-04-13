var express = require('express');
var router = express.Router();

router.get('/top', function (req, res, next) {
    var nylas = Nylas.with(req.query.token);

    // first thread
    nylas.threads.first().then(function (thread) {
        res.render('thread', {
            thread: thread
        });
    });

    // all threads (warning - will take a while - check server logs for live stream)
    // nylas.threads.list().then(function (threads) {
        // console.log('threads', threads);
    // });
});

module.exports = router;
