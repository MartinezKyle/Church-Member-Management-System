document.addEventListener("DOMContentLoaded", function (event) {
	$("#submit").click(function () {
        var phonenum = document.querySelector("#phonenum");
		var session = document.querySelector("#session");
		
        if (phonenum.value != "" && session.value != "") {
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
        }
		else {
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Fill up all fields.";
			console.log("error");
		}
    });   
});
