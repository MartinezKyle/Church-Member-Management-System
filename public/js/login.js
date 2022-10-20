document.addEventListener("DOMContentLoaded", function (event) {
    var errorText = document.querySelector('#errorText');
    var form = document.querySelector('#login');
	$("#submit").click(function () {
        var number = document.querySelector('#phonenum');
        var pass = document.querySelector('#password');
        var url = `/CheckLogin?phonenum=${number.value}&password=${pass.value}&permission=admin`;
		
        if(number.value != "" && pass.value != ""){
            $.post(url, (data, status, xhr) => {
                if(status == "success"){
                    if(!data){
                        errorText.innerHTML = "Account with this phonenum/password does not exist";
                    } else {
                        alert("Logged in");
                        window.location.href = '/loadMembers';
                    }
                }
            });
            form.reset();
        } else {
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Enter registered number/password.";
			console.log("error");
        }
    });
});
