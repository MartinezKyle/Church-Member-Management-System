document.addEventListener("DOMContentLoaded", function (event) {
    var errorText = document.querySelector('#error');
    var form = document.querySelector('#login');
	  $("#submit").click(function () {
        var number = document.querySelector('#phonenum');
        var pass = document.querySelector('#password');
        var url = `/CheckLogin?phonenum=${number.value}&password=${pass.value}`;
        if(number.value != "" && pass.value != ""){
            $.post(url, (data, status, xhr) => {
                if(status == "success"){
                    if(!data){
                        console.log("Account with this phonenum/password does not exist");
                        errorText.innerHTML = "Account with this phonenum/password does not exist";
                    } else {
                        alert("Logged in");
                        window.location.href = '/loadMembers';
                    }
                }
            });
            form.reset();
        } else {
			      errorText.innerHTML = "";
			      errorText.innerHTML += "Fill up all fields.";
        }
    });
});
