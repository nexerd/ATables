 var count = 0;
 $(function() {
 	$('#next').click(function(){
 		var addr = window.location.href;
 		var params = addr.split('/Tables/')[1].split('?');
 		var _id = params[0];
 		count += 10;
 		$.ajax({
 			type: "GET",
 			url: "/Tables/" + _id + "/" + count, 			
 			success: function(ads){ 
 				$("#next").hide();	
 				if (ads != '')
 				{
 					$("#ads").append(ads);
 					$("#next").show();
 				}

 			}
 		});
 	});
 });