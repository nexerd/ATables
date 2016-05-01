$(function() {
	$("#ad .delete").click(function(){
		var _id = $("#ad .id").attr('value');
		$.ajax({
			type: 'DELETE',
			url: '/Ads/' + _id + '/',
			success: function(url){
				$(location).attr('href',url);
			}
		});
	});
});