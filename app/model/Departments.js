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
				var collection = db.collection("Departments");	
				if (params.Name && params.Type)
				{				
					var request = { Type: params.Type,	Name: params.Name };
				}
				else if (params.Id)
				{
					var ObjectID = require("mongodb").ObjectID;
					var request = { _id: ObjectID(params.Id) };
				}
				else if (params.BaseDepartment)
				{
					var ObjectID = require("mongodb").ObjectID;
					var request = { BaseDepartment: params.BaseDepartment.toString() };
				}
				else if (params.Type)
				{
					var request = { Type: params.Type };
				}
				else
					throw "Empty request!";

				//console.log("\nDepartment collection find:");
				//console.log(request);
				collection.find(request, function(err, doc){
					if (err)
					{
						eventEmitter.emit("error", err);
						db.close();
					}
					else
					{
						doc.toArray(function(err, items)
							 {
							 	//console.log(items);
							 	eventEmitter.emit("success", items);
							 	db.close();
							 });						
					}
					
				});
			}
			
		});
		return eventEmitter;
	};
}
