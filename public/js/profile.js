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
});