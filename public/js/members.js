$(document).ready(() => {
    let phonenum;

    $("#trigger-delete-modal").click(function () {
        console.log($(this))
        phonenum = $(this).attr("data-id")
        $("#delete-modal").modal('show');
        console.log(phonenum);
    });

    $("#delete").click(function () {
        var url = '/deleteMember?phonenum=' + phonenum;
        $.get(url, (data, status, xhr) => {
            // alert(status);
            if (status == "success") {
                window.location.href = "/loadMembers";
            }
        });
    });
})