var mongoose = require("mongoose");
var config = require("../config");

var dbConfig = config.get('database');
var uri = dbConfig.url + dbConfig.name;
mongoose.connect(uri, dbConfig.options);

mongoose.connection.on("close",  function()
{	
	console.log("Connection  " + uri + "  close...");
});
mongoose.connection.on("open",  function()
{	
	console.log("Connection " + uri + " open...");
});
mongoose.connection.on("error",  function(err)
{	
	console.log(err);
});

module.exports = mongoose;