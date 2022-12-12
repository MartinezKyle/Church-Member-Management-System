document.addEventListener("DOMContentLoaded", function (event) {
	selectVal()

	function selectVal(){
		var selectVal = window.location.search.substring(1).split("=")[1];
		console.log(selectVal);
		document.getElementById("session").value=selectVal;
	}; 

	$("#phonenum").keyup(function () {
        var input = this;
        var url = `/getCheckPhone?q=${input.value}`;
		$.get("getCheckPhone", {q: input.value}, function (result) {
			if (!result){
				document.querySelector("#errorText").innerHTML = "Phone Number not in the database";
                document.querySelector("#submit").disabled = true;
				document.querySelector("#name").value = "";
			}
			else{
				document.querySelector("#errorText").innerHTML = "";
				input.style.backgroundColor = "#e3e3e3";
                document.querySelector("#submit").disabled = false;
				document.querySelector("#name").value = result.lastname + ", " + result.firstname;
			}
		});
    });
	
	$("#submit").click(function () {
        var phonenum = document.querySelector("#phonenum").value;
		var session = document.querySelector("#session").value;
		console.log(phonenum);
		console.log(session);
		if (phonenum == "" || session == "Select Session"){
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Fill up all fields.";
			console.log("error");
		}
        else {
			$.get("getCheckAttendance", {phonenum: phonenum, session: session}, function (result) {
				if (!result){
					console.log(result);
					$.get("addAttendance", {phonenum: phonenum, session: session});
					$.get("addSession", {session: session});
					var form = document.getElementById("attendance");
					form.reset();
					document.querySelector("#errorText").innerHTML = "";
					window.location.href = `/attendance?session=${session}`;
				}
				else{
					document.querySelector("#errorText").innerHTML = "";
					document.querySelector("#errorText").innerHTML += "Phone Number is already in the specified Attendance.";
					console.log("error");
				}
			});
        }
    });   
});
