var mongoose = require("mongoose");
var AdSchema = mongoose.Schema({
	Table: mongoose.Schema.Types.ObjectId,
	Name: mongoose.Schema.Types.String,
	Text: mongoose.Schema.Types.String,
	Tag: mongoose.Schema.Types.String,
	Date: mongoose.Schema.Types.Date,
	Comments: []
});

var AdModel = mongoose.model("Ads", AdSchema);

exports.AdModel = AdModel;