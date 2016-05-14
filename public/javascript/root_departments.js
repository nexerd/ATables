$(function() {
	$(".delete_dapartment").click(function(del){
		var target = del.target;
		$.ajax({
				type: 'DELETE',
				url: "/Admin/departments/",
				data: {
					Id: $(target).attr("value")
				},
				success: function(url){
					$(location).attr('href',url);
				}
			});		
	});
})