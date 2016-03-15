//var util = require("util");

var command =
{
	type: "_type",
	collection: "_collection",
	obj: "_obj"
}

exports.createCommand = function(type, collection, obj) 
{
	this.type = type;
	this.collection = collection;
	this.obj = obj;
}

function createCommandSequnce(SequnceSize, ObjListener)//, eventName)
{
	var SequnceController = createSequnceController(SequnceSize);
	this.push = function(Element) {
	 SequnceController.push(Element);
	 ObjListener.emit("PushAction", this);
	};
	this.pop = SequnceController.pop;
}
createCommandSequnce.prototype = {};

function createSequnceController(size)
{
	var _sequnce = new Array(size);
	var _ptr = 0;
	var controller =
	{
		push: function(Element)
		{
			if (_ptr == _sequnce.length)
				throw "Sequnce overflow!";
			_sequnce[_ptr++] = Element;			
		} ,
		pop: function()
		{
			if (_ptr == 0)
				throw "Sequnce empty!";
			return _sequnce[--_ptr];
		}
	}
	return controller;
}

function createRequestController()
{	
	this.Sequnces = {};
	this.PushCommand = function(command){	
		//console.log(this.Sequnces);
		//console.log(command.collection.toString());
		this.Sequnces[command.collection.toString()].push(command);
	};
	this.addSequnce = function(name, ObjListener)
	{
		this.Sequnces[name.toString()] = new createCommandSequnce(1000, ObjListener);
	}
}
createRequestController.prototype = { };

exports.createRequestController = createRequestController;