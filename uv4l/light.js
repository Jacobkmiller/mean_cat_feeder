$(document).ready(function(){
	var light_status = false;
	var addr = "192.168.50.126";
	var local = "light_on.py";
	$("#light").click(function(){
	    console.log(addr);
	    if (!light_status) {
                $.ajax({
			url:"http://" + addr + ":5000/on",
//			url:local,
			type:"post",
			success: function(result){console.log(result)},
			crossDomain: true
		});
                light_status = true;
            } else {
                $.ajax({
			url:"http://" + addr + ":5000/off",
			type:"post",
			success: function(result){console.log(result)},
			crossDomain:true
		});
                light_status = false;
            }
	});
})
