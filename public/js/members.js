document.addEventListener("DOMContentLoaded", function (event) {
    $(".delete").click(function () {
        var phonenum = $(this).val();
        console.log(phonenum);
        var url = '/deleteMember?phonenum=' + phonenum;
        $.get(url, (data, status, xhr) => {
            alert(status);
            if (status == "success") {
                window.location.href = "/loadMembers";
            }
        });
    });
});