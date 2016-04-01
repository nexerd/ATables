
exports.Connect = function()
{
	var mongoose = require("mongoose");
	var url = 'mongodb://localhost:27017/ATableTest0';	
	mongoose.connect(url);

	var db = mongoose.connection;

	db.on("error", function (err) {
		console.log(err);
	});

	db.once("open", function(){
		console.log("Connetc db");

	});
}