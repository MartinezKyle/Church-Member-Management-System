document.addEventListener("DOMContentLoaded", function (event) {
	$("#phonenum").keyup(function () {
        var input = this;
        var url = `/getCheckPhone?q=${input.value}`;

        $.get(url, (data, status, xhr) => {
            if (status == "success") {
                if (!data) {
                    document.querySelector("#errorText").innerHTML = "";
					input.style.backgroundColor = "#e3e3e3";
                    document.querySelector("#submit").disabled = false;
                } else {
					input.style.backgroundColor = "red";
                    document.querySelector("#errorText").innerHTML = "Phone Number already in the database";
                    document.querySelector("#submit").disabled = true;
                }
            }
        });
    });

	$("#baptismstatus").change(function () {
		var baptstat = this;

		if (baptstat.value == "Infant Baptism" || baptstat.value == "Water Baptism"){
			$("#baptismaldate").prop('disabled', false);
			$("#baptismallocation").prop('disabled', false);
			$("#baptismaldate").val(null);
			$("#baptismallocation").val(null);
		}
		else{
			$("#baptismaldate").prop('disabled', true);
			$("#baptismallocation").prop('disabled', true);
			$("#baptismaldate").val(null);
			$("#baptismallocation").val(null);
		}
	});
	
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
		var today = new Date();
		var churchstatus = "For Admin Review";

		if (phonenum.value == "" || firstname.value == "" || lastname.value == "" || birthdate.value == "" || address.value == "" || gender.value == "" || baptism.value == "Select Baptism Status" || password1.value == "" || password2.value == "") {
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Fill up all fields.";
			console.log("error");
		}
		else if (baptism.value != "Unbaptized" && (baptismlocation.value == "" || baptismdate.value == "")) {
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Fill up all fields.";
			console.log("error");
		}
		else if (password2.value != password1.value) {
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Passwords don't match.";
			console.log("error");
		}
		else if (baptism.value == "Unbaptized" && (baptismlocation.value != "" || baptismdate.value != "")) {
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Unbaptized, therefore baptism location and date should not exist.";
			console.log("error");
		}
		else if (baptism.value != "Unbaptized" && ((new Date(birthdate.value) > today && new Date(baptismdate.value) > today) || new Date(birthdate.value) > new Date(baptismdate.value))){
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Invalid Birthdate and Baptismal date.";
		}
		else if (baptism.value != "Unbaptized" && new Date(baptismdate.value) > today){
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Invalid Baptismal date.";
		}
		else if (new Date(birthdate.value) > today){
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Invalid Birthdate.";
		}
        else {
			var url = `/addUser?phonenum=${phonenum.value}&firstname=${firstname.value}&lastname=${lastname.value}&password=${password1.value}&birthdate=${birthdate.value}&address=${address.value}&gender=${gender.value}&status=For%20Admin%20Review&baptism=${baptism.value}&baptismdate=${baptismdate.value}&baptismlocation=${baptismlocation.value}`;
			
			$.get(url, (data, status, xhr) => {
                alert(status);
                if (status == "success") {
                    console.log("HELLO");
                }
            });
			
			/*var url = `/addMembers?lastname=${lastname.value}&firstname=${firstname.value}&baptism=${baptism.value}`
			$.get(url, (data, status, xhr) => {
                alert(status);
                if (status == "success") {
                    document.querySelector("#members").innerHTML += data;
                }
            });*/
			
            var form = document.getElementById("register");
            form.reset();
			window.location.href = `/login`; 
        }
    });   
});
