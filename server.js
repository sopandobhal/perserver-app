const app = require('./app')
app.listen(process.env.PORT || 5000, function () {
	console.log("server running")
})