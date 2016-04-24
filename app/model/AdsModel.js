var mongoose = require("mongoose");
var AdSchema = mongoose.Schema({
	"Table": "ObjectId",
	"Name": "String",
	"Text": "String",
	"Tag": "String",
	"Date": "Date",
	"Comments": [],
	"UserId" : "ObjectId"
});

var AdModel = mongoose.model("Ads", AdSchema);
exports.AdModel = AdModel;