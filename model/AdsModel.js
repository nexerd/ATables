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
			Date: {
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
var Months = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь",
 "октябрь", "ноябрь", "декабрь"]
AdSchema.methods.getDate = function(){	
	return this.Date.getDate() + ' ' + Months[this.Date.getMonth()] + ' ' + (this.Date.getYear() % 100) +
	 "	" + this.Date.getHours() + ':' +
	  (this.Date.getMinutes() > 9 ? this.Date.getMinutes() : '0' + this.Date.getMinutes());
};

AdSchema.methods.getCommentDate = function(num){
	var commentDate = this.Comments[num].Date;
	return commentDate.getDate() + ' ' + Months[commentDate.getMonth()] + ' ' + (commentDate.getYear() % 100) +
	 "	" + commentDate.getHours() + ':' +
	  (commentDate.getMinutes() > 9 ? commentDate.getMinutes() : '0' + commentDate.getMinutes());
};

AdSchema.methods.getText = function(){
	if (this.Text.length > 1024){
		var str = this.Text.substr(0, 1024);
		str += "\n Читать продолжение..."
		return str;
	}
	return this.Text;
};

var AdModel = mongoose.model("Ads", AdSchema);
exports.AdModel = AdModel;