document.addEventListener("DOMContentLoaded", function (event) {
    function hide_submit(){
        $("#submit").prop('disabled', true);
        $(".submit_container").addClass("d-none");
    };

    function show_submit(){
        $("#submit").prop('disabled', false);
        $(".submit_container").removeClass("d-none");
    };

    function hide_concern(){
        $("#concern").prop('disabled', true);
        $("#concern").val(null);
        $(".concern_container").addClass("d-none");
        $("#concern").removeClass("border");
        $("#concern").removeClass("border-danger");
        $("#concern_error_message").addClass("d-none");
        $("#concern_error_message").text("");
        hide_submit();
    };

    function show_concern(){
        $("#concern").prop('disabled', false);
        $("#concern").val(null);
        $(".concern_container").removeClass("d-none");
        $("#concern").removeClass("border");
        $("#concern").removeClass("border-danger");
        $("#concern_error_message").addClass("d-none");
        $("#concern_error_message").text("");
        hide_submit();
    };

    function show_other(){
        $("#other").prop('disabled', false);
        $("#other").val(null);
        $(".other_container").removeClass("col");
        $(".other_container").addClass("col-md-4");
        $(".other_container").addClass("col-sm-12");
        $(".other_container").removeClass("d-none");
        $("#other").removeClass("border");
        $("#other").removeClass("border-danger");
        $("#other_error_message").addClass("d-none");
        $("#other_error_message").text("");
        hide_concern();
    };

    function hide_other(){
        $("#other").prop('disabled', true);
        $("#other").val(null);
        $(".other_container").addClass("col");
        $(".other_container").removeClass("col-md-4");
        $(".other_container").removeClass("col-sm-12");
        $(".other_container").addClass("d-none");
        $("#other").removeClass("border");
        $("#other").removeClass("border-danger");
        $("#other_error_message").addClass("d-none");
        $("#other_error_message").text("");
        hide_concern();
    };

    function show_subcategory(){
        $("#subcategory").prop('disabled', false);
        $("#subcategory").val(null);
        $(".subcategory_container").removeClass("d-none");
        $("#subcategory").removeClass("border");
        $("#subcategory").removeClass("border-danger");
        $("#subcategory_error_message").addClass("d-none");
        $("#subcategory_error_message").text("");
        hide_other();
    };

    function hide_subcategory(){
        $("#subcategory").prop('disabled', true);
        $("#subcategory").empty();
        $("#subcategory").val(null);
        $(".subcategory_container").addClass("d-none");
        $("#subcategory").removeClass("border");
        $("#subcategory").removeClass("border-danger");
        $("#subcategory_error_message").addClass("d-none");
        $("#subcategory_error_message").text("");
        hide_other();
        hide_concern();
    };

    function hide_ifae_category(){
        $("#ifaecategory").prop('disabled', true);
        $("#ifaecategory").val(null);
        $(".ifae_category_container").addClass("d-none");
        $("#ifaecategory").removeClass("border");
        $("#ifaecategory").removeClass("border-danger");
        $("#category_error_message").addClass("d-none");
        $("#category_error_message").text("");
        hide_subcategory();
    };

    function show_ifae_category(){
        $("#ifaecategory").prop('disabled', false);
        $("#ifaecategory").val(null);
        $(".ifae_category_container").removeClass("d-none");
        $("#ifaecategory").removeClass("border");
        $("#ifaecategory").removeClass("border-danger");
        $("#category_error_message").addClass("d-none");
        $("#category_error_message").text("");
        hide_subcategory()
    };
    
    function hide_property(){
        $("#property").prop('disabled', true);
        $("#property").val(null);
        $(".property_container").addClass("d-none");
        $("#property").removeClass("border");
        $("#property").removeClass("border-danger");
        $("#property_error_message").addClass("d-none");
        $("#property_error_message").text("");
        hide_ifae_category()
    }
    
    function show_property(){
        $("#property").prop('disabled', false);
        $("#property").val(null);
        $(".property_container").removeClass("d-none");
        $("#property").removeClass("border");
        $("#property").removeClass("border-danger");
        $("#property_error_message").addClass("d-none");
        $("#property_error_message").text("");
        hide_ifae_category();
    };
    
    function hide_dept(){
        $("#department").prop('disabled', true);
        $("#department").empty();
        $(".department_column").addClass("d-none");
        $("#department").removeClass("border");
        $("#department").removeClass("border-danger");
        $("#department_error_message").addClass("d-none");
        $("#department_error_message").text("");
        hide_ifae_category();
    };

    function show_dept(){
        $("#department").prop('disabled', false);
        $(".department_column").removeClass("d-none");
        $("#department").removeClass("border");
        $("#department").removeClass("border-danger");
        $("#department_error_message").addClass("d-none");
        $("#department_error_message").text("");
        hide_ifae_category();
    };

    function submit_form(){

    }

    function is_email_valid(email){
        const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        return email_regex.test(email);
    };

    function clean_string(regex, input){
        return input.replace(regex, "");
    };

    $("#email_address").on({
        "input blur": function(){
            var cursor_pos = this.selectionStart;
            var email =  $("#email_address").val();
            var email_test = /[^a-zA-Z0-9@._-]/gi
            var cleaned_email = clean_string(email_test, email);
            if (email_test.test(email)){
                cursor_pos--;
            }

            if (cleaned_email == "" || cleaned_email == null){
                $(this).addClass("border");
                $(this).addClass("border-danger");
                $("#email_error_message").removeClass("d-none")
                $("#email_error_message").text("This is a required field");
            }
            else{
                if(is_email_valid(cleaned_email)){
                    $(this).removeClass("border");
                    $(this).removeClass("border-danger");
                    $("#email_error_message").addClass("d-none")
                    $("#email_error_message").text("")
                }
                else {
                    $(this).addClass("border");
                    $(this).addClass("border-danger");
                    $("#email_error_message").removeClass("d-none")
                    $("#email_error_message").text("This is not a valid email")
                }
            }
            $(this).val(cleaned_email);
            this.setSelectionRange(cursor_pos, cursor_pos);  
        }
    });

    $("#date").on({
        "blur change": function(){
            var date = $("#date").val();
            if (date == "" || date == null){
                $(this).addClass("border");
                $(this).addClass("border-danger");
                $("#date_error_message").removeClass("d-none")
                $("#date_error_message").text("This is a required field")
            }
            else{
                $(this).removeClass("border");
                $(this).removeClass("border-danger");
                $("#date_error_message").addClass("d-none")
                $("#date_error_message").text("")
            }
        }
    });

    $("#division").on({
        "blur change": function(){
            var division = $("#division").val();
            if (division == "" || division == null){
                $(this).addClass("border");
                $(this).addClass("border-danger");
                $("#division_error_message").removeClass("d-none")
                $("#division_error_message").text("This is a required field")
            }
            else{
                $(this).removeClass("border");
                $(this).removeClass("border-danger");
                $("#division_error_message").addClass("d-none")
                $("#division_error_message").text("")
            }
        }
    });

    $("#name").on({
        "input blur": function(){
            var cursor_pos = this.selectionStart;
            var name =  $("#name").val();
            var name_test = /[^a-zA-Z0-9'.-\s]/gi
            var cleaned_name = clean_string(name_test, name);
            if (name_test.test(name)){
                cursor_pos--;
            }

            if (cleaned_name == "" || cleaned_name == null){
                $(this).addClass("border");
                $(this).addClass("border-danger");
                $("#name_error_message").removeClass("d-none")
                $("#name_error_message").text("This is a required field");
            }
            else{
                $(this).removeClass("border");
                $(this).removeClass("border-danger");
                $("#name_error_message").addClass("d-none")
                $("#name_error_message").text("")
            }

            $(this).val(cleaned_name);
            this.setSelectionRange(cursor_pos, cursor_pos); 
        }  
    });

    $("#division, #name, #email_address, #date").change(function(){
        var division = $("#division").val();
        var name = $("#name").val();
        var date = $("#date").val();
        var email = $("#email_address").val();
        if((division == null || division == "") || (name == null || name == "") || (date == null || date == "") || (email == null || email == "") || !(is_email_valid(email))){
            hide_dept();
            hide_property()
        }
        else if (division == "3"){
            hide_dept();
            show_property();
            $("#property").prop('disabled', true);
            $("#property").val(120);
            show_ifae_category();
        }
        else{
            $.get("getDepartments", {division: division}, function(result){
                $("#department").empty();
                $("#department").append("<option value=\"\" selected>Choose Division:</option>");
                result.forEach(element => {$("#department").append("<option value=" + element.id + ">" + element.department + "</option>");});
                show_dept();
                show_property()
                if (division != 4){
                    $("#property").prop('disabled', true);
                    $("#property").val(120);
                }
                else{
                    $("#property").val(null);
                    $("#property").prop('disabled', false);
                }
            });
        }
    });

    $("#department").on({
        "change blur" : function(){
            var department = $("#department").val();
            var property = $("#property").val();
            if (department != null && department != "" && property != null && property != ""){
                show_ifae_category();
                $(this).removeClass("border");
                $(this).removeClass("border-danger");
                $("#department_error_message").addClass("d-none")
                $("#department_error_message").text("")
            }
            else{
                hide_ifae_category();
                if(department == null || department == ""){   
                    $(this).addClass("border");
                    $(this).addClass("border-danger");
                    $("#department_error_message").removeClass("d-none")
                    $("#department_error_message").text("This is a required field")
                }
                else{
                    $(this).removeClass("border");
                    $(this).removeClass("border-danger");
                    $("#department_error_message").addClass("d-none")
                    $("#department_error_message").text("")
                }
            }
        }
    });

    $("#property").on({
        "change blur": function(){
            var department = $("#department").val();
            var property = $("#property").val();
            if (department != null && department != "" && property != null && property != ""){
                show_ifae_category();
                $(this).removeClass("border");
                $(this).removeClass("border-danger");
                $("#property_error_message").addClass("d-none")
                $("#property_error_message").text("")
            }
            else{
                hide_ifae_category();
                if (property == null || property == ""){
                    $(this).addClass("border");
                    $(this).addClass("border-danger");
                    $("#property_error_message").removeClass("d-none")
                    $("#property_error_message").text("This is a required field")
                }
                else{   
                    $(this).removeClass("border");
                    $(this).removeClass("border-danger");
                    $("#property_error_message").addClass("d-none")
                    $("#property_error_message").text("")
                }
            }
        }
    });

    $("#ifaecategory").on({
        "change blur": function(){
            var ifaecategory = $("#ifaecategory").val();
            if (ifaecategory == null || ifaecategory == ""){
                $(this).addClass("border");
                $(this).addClass("border-danger");
                $("#category_error_message").removeClass("d-none")
                $("#category_error_message").text("This is a required field")
                hide_subcategory();
            }
            else{
                $(this).removeClass("border");
                $(this).removeClass("border-danger");
                $("#category_error_message").addClass("d-none")
                $("#category_error_message").text("")
                $.get("getSubcategory", {category_code: ifaecategory}, function(result){
                    $("#subcategory").empty();
                    $("#subcategory").append("<option value=\"\" selected>Choose:</option>");
                    result.forEach(element => {$("#subcategory").append("<option value=" + element.id + ">" + element.category + "</option>");});
                    $("#subcategory").append("<option value=\"0\">Other:</option>");
                    show_subcategory();
                });
            }
        }
    });

    $("#subcategory").on({
        "change blur": function(){
            if($("#subcategory").val() == 0 || $("#subcategory").val() == "0"){
                $(this).removeClass("border");
                $(this).removeClass("border-danger");
                $("#subcategory_error_message").addClass("d-none")
                $("#subcategory_error_message").text("")
                show_other();
                hide_concern()
            }
            if($("#subcategory").val() == "" || $("#subcategory").val() == null){
                $(this).addClass("border");
                $(this).addClass("border-danger");
                $("#subcategory_error_message").removeClass("d-none")
                $("#subcategory_error_message").text("This is a required field")
                hide_other();
            }
            if($("#subcategory").val() != "" && $("#subcategory").val() != null && $("#subcategory").val() != 0 && $("#subcategory").val() != "0"){
                $(this).removeClass("border");
                $(this).removeClass("border-danger");
                $("#subcategory_error_message").addClass("d-none")
                $("#subcategory_error_message").text("")
                hide_other();
                show_concern();
            }
        }
    });

    $("#other").on({
        "input change blur": function(){
            if($("#other").val() == "" || $("#other").val() == null){
                $(this).addClass("border");
                $(this).addClass("border-danger");
                $("#other_error_message").removeClass("d-none")
                $("#other_error_message").text("This is a required field")
                hide_concern();
            }
            else{
                $(this).removeClass("border");
                $(this).removeClass("border-danger");
                $("#other_error_message").addClass("d-none")
                $("#other_error_message").text("")
                show_concern();
            }
        }
    });

    $("#concern").on({
        "input change blur": function(){
            if($("#concern").val() == "" || $("#concern").val() == null){
                $(this).addClass("border");
                $(this).addClass("border-danger");
                $("#concern_error_message").removeClass("d-none")
                $("#concern_error_message").text("This is a required field")
                hide_submit();
            }
            else{
                $(this).removeClass("border");
                $(this).removeClass("border-danger");
                $("#concern_error_message").addClass("d-none")
                $("#concern_error_message").text("")
                show_submit();
            }
        }
    });

    $("#submit").click(function(){
        var name = $("#name").val();
        var date = $("#date").val();
        var email_address = $("#email_address").val();
        var division = $("#division option:selected").text();
        var department = $("#department option:selected").text();
        var property = $("#property option:selected").text();
        var ifaecategory = $("#ifaecategory option:selected").text();
        var subcategory = $("#subcategory option:selected").text();
        var other = $("#other").val() == "" ? null : $("#other").val();
        var concern = $("#concern").val() == "" ? null : $("#concern").val();
        var division_id = $("#division").val();
        var subcategory_id = $("#subcategory").val();
        $("#modal_name").text(name);
        $("#modal_date").text(date);
        $("#modal_email_address").text(email_address);
        $("#modal_division").text(division);
        $("#modal_department").text(department);
        $("#modal_property").text(property);
        $("#modal_category").text(ifaecategory);
        $("#modal_subcategory_container").text(ifaecategory + " Concern")
        $("#modal_subcategory").text(subcategory);
        $("#modal_other").text(other);
        $("#modal_concern").text(concern);
        if(division_id != "3")
            $("#modal_department_container").removeClass("d-none")
        if(subcategory_id == "0")
            $("#modal_other").removeClass("d-none")
    });

    $(".close").click(function(){
        $("#modal_name").text(null);
        $("#modal_date").text(null);
        $("#modal_email_address").text(null);
        $("#modal_division").text(null);
        $("#modal_department").text(null);
        $("#modal_property").text(null);
        $("#modal_category").text(null);
        $("#modal_subcategory_container").text(null);
        $("#modal_subcategory").text(null);
        $("#modal_other").text(null);
        $("#modal_concern").text(null);
        $("#modal_department_container").addClass("d-none")
        $("#modal_other").addClass("d-none")
    });

    $("#submit_modal").click(function(){
        var name = $("#name").val();
        var date = $("#date").val();
        var email_address = $("#email_address").val();
        var division = $("#division").val();
        var department = $("#department").val();
        var property = $("#property").val();
        var ifaecategory = $("#ifaecategory").val();
        var subcategory = $("#subcategory").val();
        var other = $("#other").val() == "" ? null : $("#other").val();
        var concern = $("#concern").val() == "" ? null : $("#concern").val();
        $.post("submit_form", {
            name:name,
            date:date,
            email_address:email_address,
            division:division,
            department:department,
            property:property,
            ifaecategory:ifaecategory,
            subcategory:subcategory,
            other:other,
            concern:concern,
        }, function(result){
            if (result.result){
                console.log(result);
                $("#modal_title").text("Request successfully submitted");
                $("#success_modal_body").html("<h5>Thank you! Your request has been submitted</h5><h4>Control Number: <b>" + result.control_number + "</b></h4>");
                $("#new_form").addClass("new_form");
                $("#go_home").addClass("go_home");
                $("#go_home").removeClass("d-none");
                $("#new_form").addClass("new_form");
            }
            else{
                $("#modal_title").text("Request successfully submitted");
                $("#success_modal_body").html("<h5>There's a problem with sending your request. Please try again</h5>");
                $("#new_form").removeClass("new_form");
                $("#go_home").removeClass("go_home");
                $("#go_home").addClass("d-none");
            }
        });
    });

    $(".new_form").click(function(){
        window.location.replace("/form");
    })
    $(".go_home").click(function(){
        window.location.replace("/");
    })
});