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

	$("#ad .update").click(function(){
		var _id = $("#ad .id").attr('value');
		var text = $("#ad .text").text();
		$("#ad .text").empty();
		$("#ad .text").append("<form id='AdForm'> <textarea type='text' rows=12 cols=80 name='newText' id='newText'>" +
			text + " </textarea>" + "<button id='sendText'> Отправить </button>" + "</form>");	

		$("#AdForm").submit(function(e){
			e.preventDefault();
			$.ajax({
				type: 'PUT',
				url: '/Ads/' + _id + '/',
				data: { AdText: $("#newText").val() },
				success: function(url){
					$(location).attr('href',url);
				}
			});
		});
	});

 	$(".comment .comment_delete").click(function(comment){
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

 	$(".comment .comment_update").click(function(comment){
 		var target = comment.target;
 		var numberOfComment = $(target).attr("value"); 		
		var _id = $("#ad .id").attr('value');
		
 		
		var textComment = $(".comment_text[value=" + numberOfComment + "]");
		var text = $(textComment).text();		
		$(textComment).empty();
		$(textComment).append("<form id='CommentForm'> <textarea type='text' rows=3 cols=80 name='newCommentText' id='newCommentText'>" +
			text + " </textarea>" + "<button id='sendCommentText'> Отправить </button>" + "</form>");	

		$("#CommentForm").submit(function(e){
			e.preventDefault();
			$.ajax({
				type: 'PUT',
				url: '/Ads/' + _id + '/comment/' + numberOfComment,
				data: { CommentText: $("#newCommentText").val() },
				success: function(url){
					console.log(url)
					$(location).attr('href', url);
				}
			});
		});
	});

	$("#NewCommentForm").submit(function(e){	
		e.preventDefault();	
		var _id = $("#ad .id").attr('value');
		$.ajax({
				type: 'PUT',
				url: '/Ads/' + _id,
				data: { commentText: $("#commentText").val() },
				success: function(url){
					$(location).attr('href',url);
				}
			});
	});
});