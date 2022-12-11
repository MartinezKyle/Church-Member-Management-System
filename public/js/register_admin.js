
//const csv_to_json = require("./csv_to_json.js")

document.addEventListener("DOMContentLoaded", function (event) {
	$("#phonenum").keyup(function () {
        var input = this;
        var url = `/getCheckPhoneMod?q=${input.value}`;

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
	
	$("#submit-single").click(function () {
        var phonenum = document.querySelector("#phonenum");
		var firstname = document.querySelector("#firstname");
		var lastname = document.querySelector("#lastname");
		var password1 = document.querySelector("#password1");
		var password2 = document.querySelector("#password2");

		if (phonenum.value == "" || firstname.value == "" || lastname.value == ""  || password1.value == "" || password2.value == "") {
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Fill up all fields.";
			console.log("error");
		}
		else if (password2.value != password1.value) {
			document.querySelector("#errorText").innerHTML = "";
			document.querySelector("#errorText").innerHTML += "Passwords don't match.";
			console.log("error");
		}
        else {
			
			var url = `/addMod?phonenum=${phonenum.value}&firstname=${firstname.value}&lastname=${lastname.value}&password=${password1.value}`;
			
			$.get(url, (data, status, xhr) => {
                alert(status);
                if (status == "success") {
                    console.log("HELLO");
                }
            });
			
            var form = document.getElementById("register-moderator");
            form.reset();
			window.location.href = `/register-moderator`; 
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
						console.log(jsonData);
						var docs =  JSON.stringify(jsonData, null, 0);
						$.ajax({
							url: "/addMultipleMod",
							type: "POST",
							data: JSON.stringify(jsonData, null, 0),
							processData: false,
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
});

