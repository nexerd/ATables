var mongoose = require("mongoose");
var AdSchema = mongoose.Schema({
	"Table": {
		type : mongoose.Schema.Types.ObjectId,
		required: true
	},
	"Name": {
		type : String,
		required: true
	},
	"Text": {
		type : String,
		required: true
	},
	"Tag": {
		type : String,
		required: true
	},
	"Date": {
		type : Date,
		default: Date.now,
		required: true
	},
	"Comments": {
		type : [ {
			Text: String,
			Data: {
				type: Date,
				default: Date.now,
			},
			User: {
				Id: mongoose.Schema.Types.ObjectId,
				Name: String
			}
		} ]
	},
	"User" : {
		"Id": {
			type : mongoose.Schema.Types.ObjectId,
			//required: true
		},
		"Name" : {
			type : String,
			//required: true
		}
	}
});

var AdModel = mongoose.model("Ads", AdSchema);
exports.AdModel = AdModel;