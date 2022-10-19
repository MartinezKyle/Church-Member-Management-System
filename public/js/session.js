document.addEventListener("DOMContentLoaded", function (event) {
    $(".delete").click(function () {
        var sessiondata = document.querySelector(this);
        var date = new Date(sessiondata.dataset.date);
        var session = sessiondata.dataset.session;
        console.log(phonenum);
        var url = '/deleteSession?date='+phonenum+'date='+session;
        $.get(url, (data, status, xhr) => {
            alert(status);
            if (status == "success") {
                window.location.href = "/sessions";
            }
        });
    });
});
