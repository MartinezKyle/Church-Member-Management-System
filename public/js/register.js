document.addEventListener("DOMContentLoaded", function (event) {
	$("#submit").click(function () {
        var phonenum = document.querySelector("#phonenum");
		var firstname = document.querySelector("#firstname");
		var lastname = document.querySelector("#lastname");
		var birthdate = document.querySelector("#birthdate");
		var address = document.querySelector("#address");
		var gender = document.querySelector("#gender");
		var baptism= document.querySelector("#baptismstatus");
		var baptismlocation = document.querySelector("#baptismallocation");
		var baptismdate = document.querySelector("#baptismaldate");
		var password1 = document.querySelector("#password1");
		var password2 = document.querySelector("#password2");

		var churchstatus = "For Admin Review";
		var permission = "user";
        if (phonenum.value != "" && firstname.value != "" && lastname.value != "" && birthdate.value != "" && address.value != "" && gender.value != "" && baptism.value != "" && password1.value != "" && password2.value != "" && password2.value == password1.value) {
			var url = `/addUser?phonenum=${phonenum.value}&firstname=${firstname.value}&lastname=${lastname.value}&password=${password1.value}&birthdate=${birthdate.value}&address=${address.value}&gender=${gender.value}&status=For%20Admin%20Review&baptism=${baptism.value}&baptismdate=${baptismdate.value}&baptismlocation=${baptismlocation.value}&permission=user`;
			
			$.get(url, (data, status, xhr) => {
                alert(status);
                if (status == "success") {
                    console.log("HELLO");
                }
            });
			
			var url = `/addMembers?lastname=${lastname.value}&firstname=${firstname.value}&baptism=${baptism.value}`
			$.get(url, (data, status, xhr) => {
                alert(status);
                if (status == "success") {
                    document.querySelector("#members").innerHTML += data;
                }
            });
			
            var form = document.getElementById("register");
            form.reset();
			window.location.href = `/login`; 
        }
		else {
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Fill up all fields.";
			console.log("error");
		}
    });   
});