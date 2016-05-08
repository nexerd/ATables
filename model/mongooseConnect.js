var mongoose = require("mongoose");
var config = require("../config");

var debug = require('../Debug')('ATables:Mongoose')

var dbConfig = config.get('database');
var uri = dbConfig.url + dbConfig.name;
mongoose.connect(uri, dbConfig.options);

mongoose.connection.on("close",  function()
{	
	debug("Connection  " + uri + "  close...");
});
mongoose.connection.on("open",  function()
{	
	debug("Connection " + uri + " open...");
});
mongoose.connection.on("error",  function(err)
{	
	debug(err);
});

module.exports = mongoose;