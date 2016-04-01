//use ATableTest0

function RandomInt(size)
{
	return Math.floor(Math.random() * size);
}

function addDepartment(_type, _name, _baseDepartment)
{
	var _tableId = db.tables.insertOne(	{ Name: "Чья-то доска объявлений." }).insertedId.str;
	return db.departments.insertOne(
		{	
			Type: _type,
			Name: _name,
			BaseDepartment: _baseDepartment,
			TableId:  _tableId
		}).insertedId.str;
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
	var _size = RandomInt(15) + 5;	
	for (var i=0; i<_size; i++)
	{
		createStudent(_groupId);
	}
}

function createStudent(_groupId)
{
	
	var _sex = RandomInt(2);

	var _mfname = ["Петр", "Иван", "Алексей", "Александ", "Федор", "Энакин", "Феодосий", "Остап", "Захар", "Ирклий"];
	var _msname = ["Петров", "Иванов", "Афонасьев", "Александров", "Федоров", "Скайвокер", "Скворцов", "Синицын", "Георгеошвили", "Бендр"];
	var _mtname = ["Петрович", "Иванович", "Афонасьевич", "Александрович", "Федорович", "Татуинович", "Ибрагим Аглы", "Бей", "Арсенович", "Петрович"];

	var _ffname = ["Мария", "Татьяна", "Галина", "Ксения", "Анастасия", "Софья", "Елена", "Зухрия", "Лилия", "Роза"];
	var _fsname = ["Петрова", "Иванова", "Афонасьева", "Александрова", "Федорова", "Сорокина", "Скворцова", "Синицына", "Георгеошвили", "Бендр"];
	var _ftname = ["Петровна", "Ивановна", "Афонасьевна", "Александровна", "Федоровна", "Георгеевна", "Ибрагим Аглы", "Бей", "Арсеновна", "Петровна"];

	if (_sex)
	{
		return db.users.insertOne(
		{	
			Department: _groupId,
			Sex: "Мужской",
			FirstName: _mfname[RandomInt(10)],
			SecondName: _msname[RandomInt(10)],
			ThirdName: _mtname[RandomInt(10)],
		}).insertedId.str;
	}
	else
	{
		return db.users.insertOne(
		{	
			Department: _groupId,
			Sex: "Женский",
			FirstName: _ffname[RandomInt(10)],
			SecondName: _fsname[RandomInt(10)],
			ThirdName: _ftname[RandomInt(10)],
		}).insertedId.str;
	}
}

function createAds(count)
{
	var cursorTables = db.tables.find();
	var sizeCursor =  cursorTables.count();

	var _Anames = ["Срочно!", "Конференция!", "Деканат! Долги!", "Общее собрание", "Разыскивается"];
	var _Atags = ["Учеба", "Спорт", "Мероприятия", "Работа", "Важное"];
	var _AdId;
	var _idTable;
	for (var i=0; i<count; i++)
	{
		_idTable = cursorTables[RandomInt(sizeCursor)]._id;
		_AdId = db.ads.insertOne(	
		{ 
			Table: _idTable,
			Name: _Anames[RandomInt(5)],
			Text: "Бла-бла бла бал. Оолололололололололлоло. Какая-то ерунда. Балалала. срочно. брыстро. мигом. ВСе отчислены!",
			Tag: _Atags[RandomInt(5)],
			Date: new Date(2015, RandomInt(3) + 1, RandomInt(20)),
			Comments: [ "Первый коммент!", "Второй коммент!", "Третий коммент" ]
		}).insertedId.str;
	}
}

function _Main()
{
	createUniversity();
	createAds(1000);
}

 _Main();