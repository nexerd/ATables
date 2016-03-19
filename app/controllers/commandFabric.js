function creatCommand(type, action, params) 
{
	this.Type = type;
	this.Action = action;
	this.Params = params;
}
//creatCommand.prototype = 

exports.commandFabric = function(type, action, params)
{
	var command = new creatCommand(type, action, params);
	return command;
}