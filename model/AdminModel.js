var crypto = require("crypto")
var mongoose = require("mongoose");
var DepartmentSchema = require("../model/DepartmentsModel").DepartmentSchema;	

var AdminSchema = mongoose.Schema({
	AdminName: {
		type : String,
		unique: true,
		required: true
	},
	HashedPassword:	{
		type : String,
		required: true
	},
	Salt: {
		type : String,
		required: true
	},
	Created: {
		type: Date,
		default: Date.now
	}
});


AdminSchema.methods.encryptPassword = function(password){	
	var hmac = crypto.createHmac("sha1", this.Salt);
	hmac.update(password.toString());	
	return hmac.digest("hex");
};

AdminSchema.virtual("password")
	.set(function(password) {		
		this._plainPassword = password;
		this.Salt = crypto.randomBytes(32).toString("base64");
		this.HashedPassword = this.encryptPassword(password);	
	})
	.get(function() { return this._plainPassword; });

AdminSchema.virtual("isAdmin")
	.get(function(){ return true; });

AdminSchema.methods.checkPassword = function(password){	
	return this.encryptPassword(password) === this.HashedPassword;
};

var AdminModel = mongoose.model("Admins", AdminSchema);
exports.AdminModel = AdminModel;