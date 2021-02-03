//Dependencies
const express = require('express')
const fs = require('fs-extra')
const bodyParser = require('body-parser')
const morgan = require('morgan')

let hangUpScript = [{"Hangup": {"callId": "replaceVal:CallId", "reason": "timeout"}}]
let recordUtteranceScript = [
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

// Create server
const app = express()


app.use(bodyParser.json())

app.post('/recordUtterance', function(req, res) {
	console.log(`new call received on recordUtterance endpoint: ${JSON.stringify(req.body)}`)

	console.log(`Sending recordUtteranceScript script: ${JSON.stringify(recordUtteranceScript)}`)
	res.send(recordUtteranceScript)
})

app.post('/hangup', function (req, res){
	console.log(`hangup url invoked: ${JSON.stringify(req.body)}`)

	hangUpScript[0].Hangup.callId = req.body.callId
	console.log(`Sending Hangup script: ${JSON.stringify(hangUpScript)}`)

	res.send(hangUpScript)
})

module.exports = app
