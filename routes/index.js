var http = require('http');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var json2csv = require('json2csv');

router.get('/', function(req, res, next) {
    // file fields
    var FIELDS = {
        contacts: ['account_id', 'email', 'id', 'name', 'object', 'phone_numbers'],
        calendar: ['account_id', 'busy', 'calendar_id', 'description', 'id', 'location', 'message_id', 'object', 'owner', 'participants'],
        thread: ['account_id', 'drafts', 'first_message_timestamp', 'has_attachments', 'id', 'labels', 'last_message_received_timestamp', 'last_message_sent_timestamp', 'last_message_timestamp', 'messages', 'object', 'participants', 'snippet', 'starred', 'subject', 'unread', 'version']
    };

    // csv ouput file paths
    var FILES = {
        contacts: './csv/contacts.csv',
        calendar: './csv/calendar.csv',
        thread: './csv/thread.csv'
    };

    // clear files
    fs.writeFile(FILES.contacts, '', function() { console.log('cleared contact csv') });
    fs.writeFile(FILES.calendar, '', function() { console.log('cleared calendar csv') });
    fs.writeFile(FILES.thread, '', function() { console.log('cleared thread csv') });

    // read export directory
    fs.readdir('./export', function(err, files) {
        if (err) throw err;

        var fileType;
        var fileFields;
        // loop through each file
        files.forEach(function (file, index) {
            // read file
            fs.readFile('./export/' + file, 'utf8', function(err, data) {
                if (err) throw err;
                data = JSON.parse(data);

                fileType = file.replace(/[0-9]/g, '');
                fileType = fileType.substring(0, fileType.length - 5);

                fileFields = FIELDS[fileType];

                json2csv({ data: data, field: fileFields }, function(err, csv) {
                    if (err) throw err;
                    // append file data to csv file
                    fs.appendFile(FILES[fileType], csv, function(err) {
                        if (err) throw err;
                        else console.log('successfully wrote to file');
                    });
                });
            });

        })
    });
});

module.exports = router;
