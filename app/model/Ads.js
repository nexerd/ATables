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
				var collection = db.collection("Ads");	
				if (params.Date)
				{				
					var request = { Date : { $gt : params.Date} };
				}
				else if (params.Id)
				{
					var ObjectID = require("mongodb").ObjectID;
					var request = { _id: ObjectID(params.Id) };
				}
				collection.findOne(request, function(err, doc){
					if (err)
					{
						eventEmitter.emit("error", err);
					}
					else
						eventEmitter.emit("success", doc);
					db.close();
				});
			}
			
		});
		return eventEmitter;
	};
}
