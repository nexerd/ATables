$(function() {
	console.log("qq");
	$(".detele_user").click(function(del){
		var target = del.target;
		$.ajax({
				type: 'DELETE',
				url: "/Admin/users/",
				data: {
					Id: $(target).attr("value")
				},
				success: function(url){
					$(location).attr('href',url);
				}
			});		
	});
});