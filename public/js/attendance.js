document.addEventListener("DOMContentLoaded", function (event) {
	$("#phonenum").keyup(function () {
        var input = this;
        var url = `/getCheckPhone?q=${input.value}`;

        $.get(url, (data, status, xhr) => {
            if (status == "success") {
                if (data) {
                    document.querySelector("#errorText").innerHTML = "";
					input.style.backgroundColor = "#e3e3e3";
                    document.querySelector("#submit").disabled = false;
                } else {
					input.style.backgroundColor = "red";
                    document.querySelector("#errorText").innerHTML = "Phone Number not in the database";
                    document.querySelector("#submit").disabled = true;
                }
            }
        });
    });
	
	$("#submit").click(function () {
        var phonenum = document.querySelector("#phonenum");
		var session = document.querySelector("#session");
		
		if (phonenum.value == "" || session.value == "Select Session"){
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Fill up all fields.";
			console.log("error");
		}
        else {
			var url = `/getCheckAttendance?phonenum=${phonenum.value}&session=${session.value}`;
			$.get(url, (data, status, xhr) => {
				// Starting here.
                if (status == "success") {
					
                    var url = `/addAttendance?phonenum=${phonenum.value}&session=${session.value}`;
					$.get(url, (data, status, xhr) => {
						alert(status);
						if (status == "success") {
							console.log("HELLO");
						}
					});
					
					var url = `/addSession?session=${session.value}`;
					$.get(url, (data, status, xhr) => {
						alert(status);
						if (status == "success") {
							console.log("HELLO");
						}
					});
					var form = document.getElementById("attendance");
					form.reset();
					
                }
            });
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Phone Number is already in the specified Attendance.";
			console.log("error");
        }
    });   
});
