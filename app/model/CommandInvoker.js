var invokers = {};
exports.addInvoker = function(prefix)
{
	var invoker = require("./" + prefix);	
	invokers[prefix] = invoker.createInvoker;
}

exports.invoke = function(command)
{		
	var invoker = new invokers[command.Type];
	return invoker[command.Action](command.Params);
}

