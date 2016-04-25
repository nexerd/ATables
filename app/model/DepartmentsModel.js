var mongoose = require("mongoose");
var DepartmentSchema = mongoose.Schema({
	"Type": {
		type : String,		
	},
	"Name": {
		type : String,
		required: true
	},
	"BaseDepartment": {
		type : mongoose.Schema.Types.ObjectId,
		//required: true
	},
	"TableId":  {
		type : mongoose.Schema.Types.ObjectId,
		required: true
	}
});	

var DepartmentModel = mongoose.model("Departments", DepartmentSchema);
exports.DepartmentModel = DepartmentModel;