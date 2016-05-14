$(function() {
	$(".detele_ad").click(function(del){
		var target = del.target;
		$.ajax({
				type: 'DELETE',
				url: "/Admin/ads/",
				data: {
					Id: $(target).attr("value")
				},
				success: function(url){
					$(location).attr('href',url);
				}
			});		
	});
});