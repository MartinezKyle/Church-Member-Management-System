//const csv_to_json = require("./csv_to_json.js")

document.addEventListener("DOMContentLoaded", function (event) {
	$("#phonenum").keyup(function () {
        var input = this;
        var url = `/getCheckPhone?q=${input.value}`;

        $.get(url, (data, status, xhr) => {
            if (status == "success") {
                if (!data) {
                    document.querySelector("#errorText").innerHTML = "";
					input.style.backgroundColor = "#e3e3e3";
                    document.querySelector("#submit-single").disabled = false;
                } else {
					input.style.backgroundColor = "red";
                    document.querySelector("#errorText").innerHTML = "Phone Number already in the database";
                    document.querySelector("#submit-single").disabled = true;
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
	
	$("#submit-single").click(function () {
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

		if (phonenum.value == "" || firstname.value == "" || lastname.value == "" || birthdate.value == "" || address.value == "" || gender.value == "" || baptism.value == "Select Baptism Status" /*|| password1.value == "" || password2.value == ""*/) {
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Fill up all fields.";
			console.log("error");
		}
		else if (baptism.value != "Unbaptized" && (baptismlocation.value == "" || baptismdate.value == "")) {
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Fill up all fields.";
			console.log("error");
		}
		/*else if (password2.value != password1.value) {
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Passwords don't match.";
			console.log("error");
		}*/
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
			if(baptismlocation.value == ""){
				baptismlocation.value = null
			};
			if(baptismdate.value == ""){
				baptismdate.value = null;
			}
			var url = `/addUser?phonenum=${phonenum.value}&firstname=${firstname.value}&lastname=${lastname.value}&birthdate=${birthdate.value}&address=${address.value}&gender=${gender.value}&status=For%20Admin%20Review&baptism=${baptism.value}&baptismdate=${baptismdate.value}&baptismlocation=${baptismlocation.value}`;
			
			$.get(url, (data, status, xhr) => {
                // alert(status);
                if (status == "success") {
                    console.log("HELLO");
                }
            });

			var toastElList = [].slice.call(document.querySelectorAll('.toast'))
			var toastList = toastElList.map(function(toastEl) {
				return new bootstrap.Toast(toastEl)
			});

			toastList.forEach(toast => toast.show());
			
            var form = document.getElementById("register-churchgoer");
            form.reset();
			// window.location.href = `/register-churchgoer`; 
        }
    });
	
	$("#submit-bulk").click(function() {
		var fileList = document.querySelector("#csv").files;
		if (fileList.length==0){
			console.log("Please choose a file");
			alert("Please choose a file");
		}
		else{
			var filename = fileList[0].name;
       		var ext = filename.substring(filename.lastIndexOf(".")).toLowerCase();
			if (ext == ".csv") {
				var jsonData= [];
				try {
					var reader = new FileReader();
					reader.readAsBinaryString(fileList[0]);
					reader.onload = function(e) {
						var headers = [];
						var rows = e.target.result.replace("ï»¿", "").split("\n");
						for (var i = 0; i < rows.length; i++) {
							var cells = rows[i].split(",");
							var rowData = {};
							for(var j=0;j<cells.length;j++){
								if(i==0){
									var headerName = cells[j].trim();
									headers.push(headerName);
								}
								else{
									var key = headers[j];
									var value = cells[j].trim();
									if (value == 'null' || value == ''){
										value = null;
									}
									if(key){
										rowData[key] = value;
									}
								}
							}
							if(i!=0){
								jsonData.push(rowData);
							}
						}
						//console.log(jsonData);
						var docs =  JSON.stringify(jsonData, null, 0);
						console.log("/addMultipleCG?docs=" + docs);
						$.ajax({
							url: "/addMultipleCG",
							type: "POST",
							data: JSON.stringify(jsonData, null, 0),
							processData: true,
							contentType: "application/json; charset=UTF-8",
						});
					}
				}
				catch(e){
					console.log("done catch");
					console.error(e);
				}
			}
			else{
				console.log("Please choose a valid csv file");
				alert("Please choose a valid csv file");
			}
		}
	});
	$("#download_template").click(function () {
		window.open('/csv_templates/users.csv');
	});
});

