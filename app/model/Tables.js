exports.createInvoker = function () 
{
	this.MongoClient = require("mongodb").MongoClient;
	this.url = 'mongodb://localhost:27017/ATableTest0';	

	this.Read = function(params) 
	{
		var events = require("events");
		var eventEmitter = new events.EventEmitter();		
		this.MongoClient.connect(this.url, function(err, db){
			if (err)
			{
				eventEmitter.emit("error", err);
			}
			else
			{
				var collection = db.collection("tables");	
				if (params.Id)
				{
					var ObjectID = require("mongodb").ObjectID;
					var request = { _id: ObjectID(params.Id) };
				}
				else
					throw "Empty request!";

				console.log("\nTables collection find:");
				console.log(request);
				collection.findOne(request, function(err, doc){
					if (err)
					{
						eventEmitter.emit("error", err);
					}
					else
					{
						eventEmitter.emit("success", doc);						
					}
					db.close();					
				});
			}
			
		});
		return eventEmitter;
	};
}
