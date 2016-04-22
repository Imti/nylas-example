#!/bin/sh

## CONTACTS
# json2csv -k object,id,name,email -i contacts1.json -o contacts.csv

## EVENTS
# json2csv -k  object,id,title,calendar_id,description,location,participants.name,participants.email,when.time,when.date,when.timespan,when.datespan,recurrence

## THREAD
# json2csv -k object,id,account_id,first_message_timestamp,last_message_timestamp,subject,participants.name,participants.email -i threads.json -o threads.csv

## CONCAT CSV FILES
((n = $1))
for i in $(seq 1 $n)
do
  in2csv ./export/$2$i.json >> ./csv/$2.csv
done
