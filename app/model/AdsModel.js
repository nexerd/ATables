var mongoose = require("mongoose");
var AdSchema = mongoose.Schema({
	"Table": {
		type : mongoose.Schema.Types.ObjectId,
		required: true
	},
	"Name": {
		type : mongoose.Schema.Types.String,
		required: true
	},
	"Text": {
		type : mongoose.Schema.Types.String,
		required: true
	},
	"Tag": {
		type : mongoose.Schema.Types.String,
		required: true
	},
	"Date": {
		type : Date,
		required: true
	},
	"Comments": {
		type : Array,
		//required: true
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