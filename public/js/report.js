document.addEventListener("DOMContentLoaded", function (event) {
    $("#start_date").change(function(){
        if ($("#start_date").val() != null && $("#start_date").val() != ""){
            $("#end_date").prop('min', $("#start_date").val());
            $("#end_date").prop('disabled', false);
        }
        else {
            $("#end_date").val(null)
            $("#end_date").prop('disabled', true);
            $("#apply_filter").prop('disabled', true);
        }
    });

    $("#end_date").change(function(){
        if ($("#end_date").val() != null && $("#end_date").val() != ''){
            $("#start_date").prop('max', $("#end_date").val());
            $("#apply_filter").prop('disabled', false);
        }
        else {
            $("#start_date").prop('max', $("#end_date").prop('max'));
            $("#apply_filter").prop('disabled', true);
        }
    });

    $("#apply_filter").click(function(){
        console.log(new Date().toISOString());
        var start_date = new Date(new Date($("#start_date").val()) - (24 * 60 * 60 * 1000)).toISOString().slice(0,10).concat(" 16:00:00");
        var end_date = new Date($("#end_date").val()).toISOString().slice(0,10).concat(" 15:59:59");
        console.log(start_date + " - " + end_date);
        $.get("statusReport", {start_date:start_date, end_date:end_date}, function(result){
            console.log(result);
            $("#statuscontainer").empty();
            result.forEach(element => {$("#statuscontainer").append("<div class=\"col-md d-flex flex-column \"><div class=\"row d-flex align-items-center justify-content-center\"><h4 class=\"text-center text-break\">" + element.status + "</h4></div><div class=\"row d-flex flex-grow-1 align-items-center justify-content-center\"><h1 class=\"display-3 text-center\">" + element.count + "</h1></div></div>");});
        });
        $.get("categoryReport", {start_date:start_date, end_date:end_date}, function(result){
            console.log(result);
            $("#categorycontainer").empty();
            result.forEach(element => {$("#categorycontainer").append("<div class=\"col-md d-flex flex-column \"><div class=\"row d-flex align-items-center justify-content-center\"><h4 class=\"text-center text-break\">" + element.shorthand + "</h4></div><div class=\"row d-flex flex-grow-1 align-items-center justify-content-center\"><h1 class=\"display-3 text-center\">" + element.count + "</h1></div></div>");});
        });
        $.get("errorReport", {start_date:start_date, end_date:end_date}, function(result){
            console.log(result);
            $("#errorcontainer").empty();
            result.forEach(element => {$("#errorcontainer").append("<div class=\"col-md d-flex flex-column \"><div class=\"row d-flex align-items-center justify-content-center\"><h4 class=\"text-center text-break\">" + element.error + "</h4></div><div class=\"row d-flex flex-grow-1 align-items-center justify-content-center\"><h1 class=\"display-3 text-center\">" + element.count + "</h1></div></div>");});
        });
        $.get("top5Report", {start_date:start_date, end_date:end_date}, function(result){
            console.log(result);
            $("#toppropertycontainer").empty();
            result.forEach(element => {$("#toppropertycontainer").append("<li class=\"list-group-item d-flex\">" + element.property + "<span class=\"badge bg-primary ms-auto\">" + element.count + "</span></li>");});
        });

    });
});