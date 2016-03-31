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
				if (params.Id)
				{
					var ObjectID = require("mongodb").ObjectID;
					var request = { _id: ObjectID(params.Id) };
					//console.log("\nAds collection find:");
					//console.log(request);
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
				else if (params.Table)
				{
					var ObjectID = require("mongodb").ObjectID;
					var request = { Table: ObjectID(params.Table.toString()) };
					//console.log("\nAds collection find:");
					//console.log(request);
					collection.find(request, function(err, doc){
						if (err)
						{
							eventEmitter.emit("error", err);
							db.close();
						}
						else
						{
							doc.limit(10).sort({ Date : -1 }).toArray(function(err, items)
								 {
								 	//console.log(items);
								 	eventEmitter.emit("success", items);
								 	db.close();
								 });	
						}
					});
				}
				else
					throw "Empty request!";

				
			}
			
		});
		return eventEmitter;
	};

	this.Write = function(Ad) 
	{
		var events = require("events");
		var eventEmitter = new events.EventEmitter();		
		var ObjectID = require("mongodb").ObjectID;
		Ad.Table = ObjectID(Ad.Table);
		this.MongoClient.connect(this.url, function(err, db){
			if (err)
			{
				eventEmitter.emit("error", err);
				db.close();
			}
			else
			{
				var collection = db.collection("Ads");	
				//console.log(Ad);
				collection.insertOne(Ad, function(err, ans){
					if (err)
					{
						eventEmitter.emit("error", err);
					}
					else
					{
						//console.log(ans.result);
						eventEmitter.emit("success", ans.ops);	
					}
					db.close();
				});
			}
			
		});
		return eventEmitter;
	};

	this.Update = function(params) 
	{
		var events = require("events");
		var eventEmitter = new events.EventEmitter();		
		var ObjectID = require("mongodb").ObjectID;
		params.Id = ObjectID(params.Id);
		this.MongoClient.connect(this.url, function(err, db){
			if (err)
			{
				eventEmitter.emit("error", err);
				db.close();
			}
			else
			{
				var collection = db.collection("Ads");						
				collection.updateOne({_id: params.Id}, {$push: { Comments: params.Comment.toString() }}, function(err, ans){
					if (err)
					{
						eventEmitter.emit("error", err);
					}
					else
					{
						//console.log(ans.result);
						eventEmitter.emit("success", ans.ops);	
					}
					db.close();
				});
			}
			
		});
		return eventEmitter;
	};
}
