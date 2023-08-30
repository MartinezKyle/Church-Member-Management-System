document.addEventListener("DOMContentLoaded", function (event) {
    $('#log-in').click(function(){
        var email = $("#email").val();
        var password = $("#password").val();
        $.post("checkLogin", {email: email, password: password}, function(result){
            if (result)
                $.get("getDetails", {email: email, password: password}, function(result){
                    var details = result[0];
                    console.log(details.id + ", " + details.name + ", " + details.email + ", " + details.password);
                    $.post("createSession", {id:details.id, name:details.name,email:details.email}, function(result){
                        window.location.href = "/home";
                    });
                });
            else
                alert("User is not found. Try again");
        });
    });
});