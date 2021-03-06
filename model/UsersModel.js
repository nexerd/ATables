var crypto = require("crypto")
var mongoose = require("mongoose");
var DepartmentSchema = require("../model/DepartmentsModel").DepartmentSchema;	

var UserSchema = mongoose.Schema({
	UserName: {
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
	},
	FirstName: {
		type : String,
		required: true
	},
	SecondName: {
		type : String,
		required: true
	},
	ThirdName: {
		type : String,
		required: true
	},
	Departments: {
		type : [{
			DocDepartment: DepartmentSchema,
			LastOpened: Date
		}]
		//required: true
	}
});

UserSchema.methods.encryptPassword = function(password){	
	var hmac = crypto.createHmac("sha1", this.Salt);
	hmac.update(password.toString());	
	return hmac.digest("hex");
};

UserSchema.virtual("password")
	.set(function(password) {		
		this._plainPassword = password;
		this.Salt = crypto.randomBytes(32).toString("base64");
		this.HashedPassword = this.encryptPassword(password);	
	})
	.get(function() { return this._plainPassword; });

UserSchema.methods.checkPassword = function(password){	
	return this.encryptPassword(password) === this.HashedPassword;
};

var UserModel = mongoose.model("Users", UserSchema);
exports.UserModel = UserModel;