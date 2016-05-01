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

 	$(".comments .comment_delete").click(function(comment){
 		var target = comment.target;
 		var numberOfComment = $(target).attr("value");
 		var _id = $("#ad .id").attr('value');
 		$.ajax({
			type: 'DELETE',
			url: '/Ads/' + _id + '/comment/' + numberOfComment,
			success: function(url){
				$(location).attr('href',url);
			}
		});
 	});
});