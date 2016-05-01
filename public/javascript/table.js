 var count = 0;
 $(function() {
 	$('#next').click(function(){
 		var _id = $("#table_id").attr("value");
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