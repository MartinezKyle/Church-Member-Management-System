document.addEventListener("DOMContentLoaded", function (event) {
    //var errorText = document.getElementById("errorText");
	$("#submit").click(function () {
        var number = document.querySelector('#phonenum');
        var pass = document.querySelector('#password');
        		
        if(number.value != "" && pass.value != ""){
            var url = `/CheckLogin?phonenum=${number.value}&password=${pass.value}`;
            var auth = `/AllowLogin?phonenum=${number.value}`;
            var sesh = `/createSession?phonenum=${number.value}`;
            
            $.post(url, (data, status, xhr) => {
                if(status == "success"){
                    if(!data){
                        document.getElementById("errorText").innerHTML = "Admin account with this phonenum/password does not exist";
                    } else {
                        //alert("Logged in");
                        $.get(sesh, (data, status, xhr) => {
                            if(status == 'success'){
                                console.log("Session Created");
                            } else {
                                console.log("An Error Occurred");
                            }
                        });
                        $.get(auth, (data, status, xhr) => {
                            if(status == 'success'){
                                window.location.href = '/loadMembers';
                            } else {
                                console.log("An Error Occurred");
                            }
                        });
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
