var mongoose = require("mongoose");
var TableSchema = mongoose.Schema({
	"Name": "String"
});

var TableModel = mongoose.model("Tables", TableSchema);
exports.TableModel = TableModel;