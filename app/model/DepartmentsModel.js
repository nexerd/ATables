var mongoose = require("mongoose");
var DepartmentSchema = mongoose.Schema({
		"Type": "String",
		"Name": "String",
		"BaseDepartment": "ObjectId",
		"TableId":  "ObjectId"
	});	

var DepartmentModel = mongoose.model("Departments", DepartmentSchema);
exports.DepartmentModel = DepartmentModel;