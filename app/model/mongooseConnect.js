exports.connect = function()
{
	var mongoose = require("mongoose");
	var url = 'mongodb://localhost:27017/ATableTest0';	
	mongoose.connect(url);
	var db = mongoose.connection;
	mongoose.connection.on("close",  function()
	{	
		console.log("Connection close...");
	});
	mongoose.connection.on("open",  function()
	{	
		console.log("Connection open...");
	});
	mongoose.connection.on("error",  function(err)
	{	
		console.log(err);
	});
	return mongoose;
}

