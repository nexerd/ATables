var mongoose = require("mongoose");

var url = process.env.OPENSHIFT_MONGODB_DB_URL ?
	 process.env.OPENSHIFT_MONGODB_DB_URL + 'test' :
	 		'mongodb://localhost:27017/ATableTest0';	
var options = {
  user: 'admin',
  pass: 'fpMJCEYw2gNm'
}

console.log(url);
if (process.env.OPENSHIFT_MONGODB_DB_URL)
	{		
		mongoose.connect(url, options);
	}
else
	mongoose.connect(url);
var db = mongoose.connection;
mongoose.connection.on("close",  function()
{	
	console.log("Connection  " + url + "  close...");
});
mongoose.connection.on("open",  function()
{	
	console.log("Connection " + url + " open...");
});
mongoose.connection.on("error",  function(err)
{	
	console.log(err);
});

module.exports = mongoose;