//Dependencies
const express = require('express')
const fs = require('fs-extra')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// setup initial global state
// let state = getEmptyState()

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

// //Log when request received
// app.use(morgan('[:date] :method :url :status :res[content-length] - :response-time ms', {immediate: true}))
// //Log when request responds
// app.use(morgan('[:date] :method :url :status :res[content-length] - :response-time ms', {immediate: false}))


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

// app.post('/', function (req, res) {
// 	console.log(`new call received: ${JSON.stringify(req.body)}`)
// 	state.vallReceived = true
// 	state.callId = req.body.callId
// 	state.accountId = req.body.accountId

// 	state.percl = replaceVal(state.percl)

// 	updateCallStatusObject(req.body.callId, req.body.callStatus, req.body.callDuration, req.body, parentCallId)
// 	console.log(`call status: ${JSON.stringify(state.callStatuses)}`)

// 	res.send(state.percl)
// })

// app.put('/', function (req, res) {
// 	console.log(`Setting up percl script in state: ${JSON.stringify(JSON.stringify(req.body))}`)
// 	state.percl = req.body
// 	state.callConnectPercl = req.body

// 	res.sendStatus(204)
// })

// app.get('/', function (req, res) {
// 	console.log(`retriving current percl script: ${JSON.stringify(state.percl)}`)
// 	state.percl = replaceVal(state.percl, "callId")
// 	res.send(state.percl)
// })



// app.post('/action', function (req, res){
// 	console.log(`Action url invoked: ${JSON.stringify(req.body)}`)

// 	updateCallStatusObject(req.body.callId, req.body.callStatus, req.body.callDuration, req.body, parentCallId)

// 	if(req.body.recordingUrl !== undefied) {
// 		state.latestRecordingUrl = req.body.recordingUrl
// 		console.log(`recordingUrl updated: ${req.body.recordingUrl}`)
// 	}

// 	state.actionScript = replaceVal(state.actionScript)
// 	res.send(state.actionScript)
// })

// app.get('/action', function (req, res) {
// 	console.log(`retriving action script: ${JSON.stringify(state.actionScript)}`)
// 	res.send(state.actionScript)
// })

// app.put('/action', function (req, res) {
// 	console.log(`Setting up action script in state: ${JSON.stringify(JSON.stringify(req.body))}`)
// 	state.actionScript = req.body

// 	res.sendStatus(204)
// })

module.exports = app
