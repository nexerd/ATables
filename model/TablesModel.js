var mongoose = require("mongoose");
var TableSchema = mongoose.Schema({
	"Name": {
		type : String,
		//required: true
	}
});

var TableModel = mongoose.model("Tables", TableSchema);
exports.TableModel = TableModel;