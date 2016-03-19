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
				if (params.Name)
				{
					console.log("Connect db");
					console.log(params);					
					var collection = db.collection("Departments");					
					collection.findOne({ Type: "Факультет",	Name: params.Name }, function(err, doc){
						if (err)
						{
							eventEmitter.emit("error", err);
						}
						else
							eventEmitter.emit("success", doc);
						db.close();
					});
				}
			}
			
		});
		return eventEmitter;
	};
}
