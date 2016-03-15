var eventEmmitter = require("events");
var util = require("util");
var mongodb = require("mongodb")

function createSequnceController(ObjListener)
{
	this.Actioners = {}
	this.createActioner = function(name, Act) {
		this.Actioners[name.toString()] = Act;
	};
	this.on("PushAction", function(ObjSender) {		
		var command = ObjSender.pop();
		console.log(command);		
		console.log(this.Actioners);	
		var Act = new this.Actioners[command.collection.toString()];		
	});
}
createSequnceController.prototype = eventEmmitter.prototype;

exports.createSequnceController = createSequnceController;

function createDepartmentActioner()
{
	var server = new mongodb.Server("localhost", 27017, {auto_reconnect: true});
	this.db = new mongodb.Db("ATableTest0", server);

}
createDepartmentActioner.prototype = { 

	readDepartmentByName: function(type, name)
	{
		db.collection("Departments", function(err, collection){
			var department = collection.findOne({Type: type, Name: name});
			console.log(department);
		});
	},

	readDepartmentById: function(id)
	{
		db.collection("Departments", function(err, collection){
			var department = collection.findOne({_id: id});
			console.log(department);
		});
	}
};

exports.AddAllActioner = function(SequnceController)
{
	SequnceController.createActioner("Department", createDepartmentActioner);
}
