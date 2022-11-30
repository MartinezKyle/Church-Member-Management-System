document.addEventListener("DOMContentLoaded", function (event) {
    //var errorText = document.getElementById("errorText");
	$("#submit").click(function () {
        var number = document.querySelector('#phonenum');
        var pass = document.querySelector('#password');
        		
        if(number.value != "" && pass.value != ""){
            var url = `/CheckLogin?phonenum=${number.value}&password=${pass.value}`;
            $.post(url, (data, status, xhr) => {
                if(status == "success"){
                    if(!data){
                        document.getElementById("errorText").innerHTML = "Admin account with this phonenum/password does not exist";
                    } else {
                        // alert("Logged in");
                        window.location.href = '/loadMembers';
                    }
                }
            });
            var form = document.getElementById("login");
            //form.reset();
        } else {
			document.getElementById("errorText").innerHTML = "";
			document.getElementById("errorText").innerHTML += "Enter registered number/password.";
			console.log("error");
        }
    });
});
