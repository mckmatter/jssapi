/*

report_nocheckin.js

This script uses the jss API to recieve the json response 
of a GET request to /JSSResource/computerreports/id/{id}

It formats the body of the response into an html table
then emails it to a an email address

Dylan McKenna
Robert Morris University
2018

*/

require('dotenv').config()
var request = require('request')
var mustache = require('mustache')
var email = require('emailjs')
var fs = require('fs')

var reportId = 1
var sendTo = process.env.SENDTO
var sendFrom = process.env.SENDFROM
var sendSubject = "JSS: No Check in for 2 weeks"


var server = email.server.connect({
	host: process.env.HOST
})

var options = {
	url: process.env.URL+reportId,
	headers: {
		'Accept': 'application/json'
	}
}

function callback(err, res, body){
	//console.log(body)
	var object = JSON.parse(body)

	fs.readFile('table.mst', 'utf8', function(err, data){
		var render = mustache.render(data, object)

		var message = {
			text: "JSS API Computer Report",
			from: sendFrom,
			to: sendTo,
			subject: subject,
			attachment:[
				{data:render, alternative:true}
			]
		}

		server.send(message, function(err, message){
			console.log("Message Sent")
		})
	})

	


}





request(options, callback)




