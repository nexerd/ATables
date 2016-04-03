//use ATableTest0

var mongoose = require("./mongooseConnect").connect();	
var DepartmentModel = require("./DepartmentsModel").DepartmentModel;	
var TableModel = require("./TablesModel").TableModel;	
var AdModel = require("./AdsModel").AdModel;	

function RandomInt(size)
{
	return Math.floor(Math.random() * size);
}

function addDepartment(_type, _name, _baseDepartment)
{
	var table = new TableModel({Name: "Чья-то доска объявлений"});
	table.save();
	createAds(RandomInt(10) + 10, table._id);
	var department = new DepartmentModel({
		Type: _type,
		Name: _name.toString(),
		BaseDepartment: _baseDepartment,
		TableId:  table._id
	});
	department.save();
	return department._id;
}

function createUniversity()
{
	var _universityId = addDepartment("Университет", "ИГЭУ им. В.И. Ленина"); 
	createFaculty("ИВТФ", 41, 47, _universityId);
	createFaculty("ЭМФ", 31, 39, _universityId);
}

function createFaculty(_name, _gfrom, _gto, _universityId)
{
	var _facultyId = addDepartment("Факультет", _name, _universityId);	
	for (var i=1; i<5; i++)
	{
		createCourse(i, _facultyId, _gfrom, _gto);
	}
	
}

function createCourse(_number, _facultyId, _gfrom, _gto)
{
	var _coursetId = addDepartment("Курс", _number, _facultyId);	
	for (var i=_gfrom; i<=_gto; i++)
	{
		createGroup(i, _coursetId);
	}
}

function createGroup(_number, _coursetId)
{
	var _groupId = addDepartment("Группа", _number, _coursetId);
	
	// Код созздания студента
}

var _Anames = ["Срочно!", "Конференция!", "Деканат! Долги!", "Общее собрание", "Разыскивается"];
var _Atags = ["Учеба", "Спорт", "Мероприятия", "Работа", "Важное"];
function createAds(count, _idTable)
{
	var _idTable;
	for (var i=0; i<count; i++)
	{
		var Ad = new AdModel(
		{ 
			Table: _idTable,
			Name: _Anames[RandomInt(5)],
			Text: "Бла-бла бла бал. Оолололололололололлоло. Какая-то ерунда. Балалала. срочно. брыстро. мигом. ВСе отчислены!",
			Tag: _Atags[RandomInt(5)],
			Date: new Date(2015, RandomInt(3) + 1, RandomInt(20)),
			Comments: [ "Первый коммент!", "Второй коммент!", "Третий коммент" ]
		});
		Ad.save();
	}
}

var db = mongoose.connection.db;
mongoose.connection.once("open",  function()
{
	db.dropDatabase(function(err){
		if (err) throw err;
		createUniversity();
		console.log("Waiting to create db!")
		setTimeout(function() {mongoose.disconnect(); console.log("Db created!")}, 20000 );
	});
	
});
mongoose.connection.on("error",  function(err)
{	
	console.log(err);
});
