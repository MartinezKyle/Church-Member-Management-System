document.addEventListener("DOMContentLoaded", function (event) {
    $("#delete-member").click(function () {
        var phonenum = $("#phonenum-display").text();
        console.log(phonenum);
        var url = '/deleteMember?phonenum=' + phonenum;
        $.get(url, (data, status, xhr) => {
            // alert(status);
            if (status == "success") {
                window.location.href = "/loadMembers";
            }
        });
    });

	$("#phonenum").keyup(function () {
        var input = this;
        var url = `/getCheckPhone?q=${input.value}`;

        $.get(url, (data, status, xhr) => {
            if (status == "success") {
                if (!data) {
                    document.querySelector("#phone-num-error").innerHTML = "";
					input.style.backgroundColor = "#e3e3e3";
                    document.querySelector("#update").disabled = false;
                } else {
					input.style.backgroundColor = "red";
                    document.querySelector("#phone-num-error").innerHTML = "Phone Number already in the database";
                    document.querySelector("#update").disabled = true;
                }
            }
        });
    });

	$("#baptism").change(function () {
		var baptstat = this;

		if (baptstat.value == "Infant Baptism" || baptstat.value == "Water Baptism"){
			$("#baptismdate").prop('disabled', false);
			$("#baptismlocation").prop('disabled', false);
			$("#baptismdate").val(null);
			$("#baptismlocation").val(null);
		}
		else{
			$("#baptismdate").prop('disabled', true);
			$("#baptismlocation").prop('disabled', true);
			$("#baptismdate").val(null);
			$("#baptismlocation").val(null);
		}
	});

    $("#update").click(function () {
        var phonenum = document.querySelector("#phonenum").value;
		var firstname = document.querySelector("#firstname").value;
		var lastname = document.querySelector("#lastname").value;
		var birthdate = document.querySelector("#birthdate").value;
		var address = document.querySelector("#address").value;
		var gender = document.querySelector("#gender").value;
		var baptism= document.querySelector("#baptism").value;
		var baptismlocation = document.querySelector("#baptismlocation").value;
		var baptismdate = document.querySelector("#baptismdate").value;
		var origphonenum = this.dataset.phonenum;
		//var password1 = document.querySelector("#password1");
		//var password2 = document.querySelector("#password2");
		var today = new Date();
		var churchstatus = "For Admin Review";
		document.querySelector("#birthday-error").innerHTML = "";
		document.querySelector("#baptismdate-error").innerHTML = "";
		if (phonenum == "" || firstname == "" || lastname == "" || birthdate == "" || address == "" || gender == "" || baptism == "") {
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Fill up all fields.";
			console.log("error");
		}
		else if (baptism != "Unbaptized" && (baptismlocation == "" || baptismdate == "")) {
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Fill up all fields.";
			console.log("error");
		}
		/*else if (password2.value != password1.value) {
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Passwords don't match.";
			console.log("error");
		}*/
		else if (baptism.value == "Unbaptized" && (baptismlocation != "" || baptismdate != "")) {
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Unbaptized, therefore baptism location and date should not exist.";
			console.log("error");
		}
		else if (baptism != "Unbaptized" && ((new Date(birthdate) > today && new Date(baptismdate) > today) || new Date(birthdate) > new Date(baptismdate))){
			document.querySelector("#baptismdate-error").innerHTML = "";
			document.querySelector("#baptismdate-error").innerHTML += "Invalid Baptismal date.";
			document.querySelector("#birthday-error").innerHTML = "";
			document.querySelector("#birthday-error").innerHTML += "Invalid Birthdate."
		}
		else if (baptism != "Unbaptized" && new Date(baptismdate) > today){
			document.querySelector("#baptismdate-error").innerHTML = "";
			document.querySelector("#baptismdate-error").innerHTML += "Invalid Baptismal date.";
		}
		else if (new Date(birthdate) > today){
			document.querySelector("#birthday-error").innerHTML = "";
			document.querySelector("#birthday-error").innerHTML += "Invalid Birthdate.";
		}
        else {
			if(baptismlocation == ""){
				baptismlocation = null
			};
			if(baptismdate == ""){
				baptismdate = null;
			}

			$.get('updateCG', {origphonenum: origphonenum, phonenum: phonenum, lastname:lastname, firstname:firstname, birthdate: birthdate, address:address, gender:gender, baptism: baptism, baptismlocation: baptismlocation, baptismdate: baptismdate}, function (result) {
				console.log(result);
				if (result){
					alert(lastname + ", " + firstname + "'s Data is successfuly updated");
					window.location.href ="/profile?phonenum=" + phonenum;
				}
				else{
					alert("There is an error in updating " + lastname + ", " + firstname + "'s data");
				}
			});
        };
    });
});