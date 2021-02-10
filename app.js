//Dependencies
const express = require('express')
const fs = require('fs-extra')
const bodyParser = require('body-parser')
const morgan = require('morgan')

let hangUpScript = [{"Hangup": {"callId": "replaceVal:CallId", "reason": "timeout"}}]
let privteRecordUtteranceScript = [
   {
      "Say" : {
         "text" : "Please leave a message after the beep."
      }
   },
   {
      "RecordUtterance" : {
         "actionUrl" : "https://perserver-app.herokuapp.com/hangup",
         "silenceTimeoutMs" : 2500,
         "maxLengthSec" : 60,
         "finishOnKey" : "#",
         "privacyMode": true
      }
   }
]

let protectedRecordUtteranceScript = [
   {
      "Say" : {
         "text" : "Please leave a message after the beep."
      }
   },
   {
      "RecordUtterance" : {
         "actionUrl" : "https://perserver-app.herokuapp.com/hangup",
         "silenceTimeoutMs" : 2500,
         "maxLengthSec" : 60,
         "finishOnKey" : "#",
         "privacyMode": false
      }
   }
]

// Create server
const app = express()


app.use(bodyParser.json())

app.post('/privateRecordUtterance', function(req, res) {
	console.log(`new call received on privateRecordUtterance endpoint: ${JSON.stringify(req.body)}`)

	console.log(`Sending privteRecordUtteranceScript script: ${JSON.stringify(privteRecordUtteranceScript)}`)
	res.send(privteRecordUtteranceScript)
})

app.post('/protectedRecordUtterance', function(req, res) {
   console.log(`new call received on protectedRecordUtterance endpoint: ${JSON.stringify(req.body)}`)

   console.log(`Sending protectedRecordUtteranceScript script: ${JSON.stringify(protectedRecordUtteranceScript)}`)
   res.send(protectedRecordUtteranceScript)
})

app.post('/hangup', function (req, res){
	console.log(`hangup url invoked: ${JSON.stringify(req.body)}`)

	hangUpScript[0].Hangup.callId = req.body.callId
	console.log(`Sending Hangup script: ${JSON.stringify(hangUpScript)}`)

	res.send(hangUpScript)
})

module.exports = app
