document.addEventListener("DOMContentLoaded", function (event) {
    $("#updateticket").click(function(){
        var control_number = $("#control_number").data("controlnumber");
        var error_code = $("#error").val() == "" ? null : $("#error").val();
        var priority_code = $("#priority").val() == "" ? null : $("#priority").val();
        var status_code = $("#status").val() == "" ? null : $("#status").val();
        var resolution = $("#resolution").val() == "" ? null : $("#resolution").val();
        var qaqc_code = $("#qaqc").data("qaqc") === "" ? null : (($("#transfer").val() == "" || $("#transfer").val() == $("#qaqc").data("qaqc")) ? $("#qaqc").data("qaqc") : $("#transfer").val());
        var date_completed = $("#datecompleted").data("datecompleted") == "" ? null : $("#datecompleted").data("datecompleted");
        var old_error = $("#error").data("olderror") == "" ? null : $("#error").data("olderror");
        var old_priority = $("#priority").data("oldpriority") == "" ? null : $("#priority").data("oldpriority");
        var old_status = $("#status").data("oldstatus") == "" ? null : $("#status").data("oldstatus");
        var old_resolution = $("#resolution").data("oldresolution") == "" ? null : $("#resolution").data("oldresolution");
        console.log(control_number + ", " + error_code + ", " + resolution + ", " + priority_code + ", " + status_code + ", " + date_completed + ", " + qaqc_code);
        console.log(control_number + ", " + old_error + ", " + old_resolution + ", " + old_priority + ", " + old_status + ", " + date_completed + ", " + qaqc_code);
        $.post("updateTicket", {control_number:control_number, error_code:error_code, resolution:resolution, priority_code:priority_code, status_code:status_code, date_completed:date_completed, qaqc_code:qaqc_code},function(result){
            window.location.href = "/ticket?control_number=" + control_number;
        });
    });

    $("#resolution").keyup(function(){
        var input = this.value;
        var old_resolution = $("#resolution").data("oldresolution");
        var error_code = $("#error").val();
        var old_error = $("#error").data("olderror");
        var priority_code = $("#priority").val();
        var old_priority = $("#priority").data("oldpriority")
        var status_code = $("#status").val();
        var old_status = $("#status").data("oldstatus")
        if (input != old_resolution || error_code != old_error || priority_code != old_priority || status_code != old_status){
            $("#updateticket").attr("disabled", false);
        }
        else
            $("#updateticket").attr("disabled", true);
    });

    $("#error").change(function(){
        var input = this.value;
        var resolution = $("#resolution").val();
        var old_resolution = $("#resolution").data("oldresolution");
        var old_error = $("#error").data("olderror");
        var priority_code = $("#priority").val();
        var old_priority = $("#priority").data("oldpriority")
        var status_code = $("#status").val();
        var old_status = $("#status").data("oldstatus")
        if (resolution != old_resolution || input != old_error || priority_code != old_priority || status_code != old_status){
            $("#updateticket").attr("disabled", false);
        }
        else
            $("#updateticket").attr("disabled", true);
    });

    $("#priority").change(function(){
        var input = this.value;
        var resolution = $("#resolution").val();
        var old_resolution = $("#resolution").data("oldresolution");
        var error_code = $("#error").val();
        var old_error = $("#error").data("olderror");
        var old_priority = $("#priority").data("oldpriority")
        var status_code = $("#status").val();
        var old_status = $("#status").data("oldstatus")
        if (resolution != old_resolution || error_code != old_error || input != old_priority || status_code != old_status){
            $("#updateticket").attr("disabled", false);
        }
        else
            $("#updateticket").attr("disabled", true);
    });

    $("#status").change(function(){
        var input = this.value;
        var resolution = $("#resolution").val();
        var old_resolution = $("#resolution").data("oldresolution");
        var error_code = $("#error").val();
        var old_error = $("#error").data("olderror");
        var priority_code = $("#priority").val();
        var old_priority = $("#priority").data("oldpriority")
        var old_status = $("#status").data("oldstatus")
        if (resolution != old_resolution || error_code != old_error || priority_code != old_priority || input != old_status){
            $("#updateticket").attr("disabled", false);
        }
        else
            $("#updateticket").attr("disabled", true);
    });
});