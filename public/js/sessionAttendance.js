document.addEventListener("DOMContentLoaded", function (event) {
    $(".delete").click(function () {
        var date = this.dataset.date;
        var session = this.dataset.session;
        var phonenum = this.dataset.phonenum;
        var url = '/deleteAttendance?date='+date+'&session='+session+"&phonenum="+phonenum;
        $.get(url, (data, status, xhr) => {
            alert(status);
            if (status == "success") {
                window.location.href = "/sessionAttendance?date=" + date + "&session=" + session;
            }
        });
    });
});