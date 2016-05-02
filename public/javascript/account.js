$(function(){
	var mainDepartment;
	$.ajax({
		type: 'GET',
		url: '/Departments/select/',
		success: function(department){
			mainDepartment = department;
			$("#main").append("<div hidden='true' id='SelectId'></div>");
			$("#SelectId").attr("value", department._id);
		}
	});
	$("#addDepartment").click(function(){
		$("#addDepartment").empty();
		var name = mainDepartment.Type + ' ' + mainDepartment.Name;
		console.log(name);
		$("#main").append(
			"<form id='newDepartment'> " + 
			"<label for='departmentSelect'> Выберите подразделение: </label> " +
			"<select id='departmentSelect' name='departmentSelect' placeholder=''>" + 
			"</select>" +			 
			"<label for='BaseDepartment'>Текущее подразделение:</label> " +
			"<input type='text' name='BaseDepartment' id='BaseDepartment'/ readonly>"+
			"<input type='submit' value='Выбрать'/>" +
			"</form>"
			);
		$("#BaseDepartment").attr("value", name);
		$.ajax({
			type: 'GET',
			url: '/Departments/select/' + mainDepartment._id + '/',
			success: function(options){				
				$("#departmentSelect").append(options);
			}
		});

		$("#departmentSelect").change(function(){			
			var _id = $("#departmentSelect").val();
			if (_id)
			{
				$("#SelectId").attr("value", _id);
				var nextName = $("#departmentSelect [value=" + _id + "]").text();
				$("#BaseDepartment").attr("value", nextName);
				$.ajax({
					type: 'GET',
					url: '/Departments/select/' + _id + '/',
					success: function(department){
						$("#departmentSelect").empty();
						$("#departmentSelect").append(department);
					}
				});
			}
		});

		$("#newDepartment").submit(function(e){	
			e.preventDefault();	
			$.ajax({
				type: 'PUT',
				url: "/User/account/department/",
				data: {
					Id: $("#SelectId").attr("value")
				},
				success: function(url){
					$(location).attr('href',url);
				}
			});
		});

	});

	$(".department_delete").click(function(del){
		var target = del.target;
		$.ajax({
				type: 'DELETE',
				url: "/User/account/department/",
				data: {
					Id: $(target).attr("value")
				},
				success: function(url){
					$(location).attr('href',url);
				}
			});			
	});
})