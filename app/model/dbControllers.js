var eventEmmitter = require("events");
var util = require("util");
var mongodb = require("mongodb")

var url = "mongodb://localhost:27017/ATableTest0";

function createSequnceController(ObjListener)
{
	this.Actioners = {}
	this.createActioner = function(name, Act) {
		this.Actioners[name.toString()] = Act;
	};
	this.on("PushAction", function(ObjSender) {		
		var command = ObjSender.pop();
		var Actioner = new this.Actioners[command.collection.toString()];		
		Actioner.readDepartmentByName(command.obj.Type, command.obj.Name)
	});
}
createSequnceController.prototype = eventEmmitter.prototype;

exports.createSequnceController = createSequnceController;

function createDepartmentActioner()
{	

}
createDepartmentActioner.prototype = { 

	actionDB: function(act)
	{
		var MongoClient = mongodb.MongoClient;	
		this.db;
		MongoClient.connect(url, function(err, _db){
			act()
		})
	}

	readDepartmentByName: function(type, name)
	{
		console.log(this.db);
		var department = this.db.collection("Departments").findOne({Type: type, Name: name});
		console.log(department);			
	},

	readDepartmentById: function(id)
	{
		var department = this.db.collection("Departments").findOne({_id: id});
		console.log(department);
	}
};

exports.AddAllActioner = function(SequnceController)
{
	SequnceController.createActioner("Departments", createDepartmentActioner);
}
